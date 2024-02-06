import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import * as synced_folder from "@pulumi/synced-folder";

// Import the program's configuration settings.
const config = new pulumi.Config();
const path = config.get("path") || "./www";
const domain = config.require("domain");
const indexDocument = config.get("indexDocument") || "index.html";
const errorDocument = config.get("errorDocument") || "error.html";

// Look up your existing Route 53 hosted zone.
const zone = aws.route53.getZoneOutput({ name: domain });

// ACM certificates MUST be created in the us-east-1 region
const usEastProvider = new aws.Provider("us-east-provider", {
    region: "us-east-1",
});
// Provision a new ACM certificate.
const certificate = new aws.acm.Certificate("certificate",
    {
        domainName: domain,
        validationMethod: "DNS",
        keyAlgorithm: 'EC_prime256v1',
        subjectAlternativeNames: ['www.' + domain]
    },
    { provider: usEastProvider },
);

const certificateValidation = new aws.acm.CertificateValidation("certificate-validation", {
    // The ARN of the certificate we're validating
    certificateArn: certificate.arn,
    // The FQDNs from the DNS validation option of the certificate
    validationRecordFqdns: certificate.domainValidationOptions.apply(
        // Map over the domain validation options to get the record FQDNs
        (options) => options.map((option) =>
            new aws.route53.Record("certificate-validation-record-" + option.domainName, {
                name: option.resourceRecordName,
                records: [option.resourceRecordValue],
                ttl: 60,
                type: option.resourceRecordType,
                zoneId: zone.zoneId,
            }).fqdn
        )
    ),
}, { provider: usEastProvider });

// Create an S3 bucket and configure it as a website.
const bucket = new aws.s3.Bucket("bucket", {
    website: {
        indexDocument: indexDocument,
        errorDocument: errorDocument,
    },
});

// Configure ownership controls for the new S3 bucket
const ownershipControls = new aws.s3.BucketOwnershipControls("ownership-controls", {
    bucket: bucket.bucket,
    rule: {
        objectOwnership: "ObjectWriter",
    },
});

// Configure public ACL block on the new S3 bucket
const publicAccessBlock = new aws.s3.BucketPublicAccessBlock("public-access-block", {
    bucket: bucket.bucket,
    blockPublicAcls: false,
});

// Use a synced folder to manage the files of the website.
const bucketFolder = new synced_folder.S3BucketFolder("bucket-folder", {
    path: path,
    bucketName: bucket.bucket,
    acl: "public-read",
}, { dependsOn: [ownershipControls, publicAccessBlock] });

// Create a CloudFront CDN to distribute and cache the website.
const cdn = new aws.cloudfront.Distribution("cdn", {
    enabled: true,
    origins: [{
        originId: bucket.arn,
        domainName: bucket.websiteEndpoint,
        customOriginConfig: {
            originProtocolPolicy: "http-only",
            httpPort: 80,
            httpsPort: 443,
            originSslProtocols: ["TLSv1.2"],
        },
    }],
    defaultCacheBehavior: {
        targetOriginId: bucket.arn,
        viewerProtocolPolicy: "redirect-to-https",
        allowedMethods: [
            "GET",
            "HEAD",
            "OPTIONS",
        ],
        cachedMethods: [
            "GET",
            "HEAD",
            "OPTIONS",
        ],
        compress: true,
        defaultTtl: 600,
        maxTtl: 600,
        minTtl: 600,
        forwardedValues: {
            queryString: true,
            cookies: {
                forward: "all",
            },
        },
    },
    priceClass: "PriceClass_100",
    customErrorResponses: [{
        errorCode: 404,
        responseCode: 404,
        responsePagePath: `/${errorDocument}`,
    }],
    aliases: [domain, 'www.' + domain],
    restrictions: {
        geoRestriction: {
            restrictionType: "none",
        },
    },
    viewerCertificate: {
        cloudfrontDefaultCertificate: false,
        acmCertificateArn: certificate.arn,
        sslSupportMethod: "sni-only",
    },
}, { dependsOn: [certificateValidation] });


// route53 records
[domain, 'www.' + domain].
    forEach((name) => {
        new aws.route53.Record(name, {
            name: name,
            zoneId: zone.zoneId,
            type: "A",
            aliases: [
                {
                    name: cdn.domainName,
                    zoneId: cdn.hostedZoneId,
                    evaluateTargetHealth: true,
                }
            ],
        }, { dependsOn: certificate });
    });


// Export the URLs and hostnames of the bucket and distribution.
export const originURL = pulumi.interpolate`http://${bucket.websiteEndpoint}`;
export const originHostname = bucket.websiteEndpoint;
export const cdnURL = pulumi.interpolate`https://${cdn.domainName}`;
export const cdnHostname = cdn.domainName;
export const url = `https://${domain}`;
export const wwwUrl = `https://www.${domain}`;
