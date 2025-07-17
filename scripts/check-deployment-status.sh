#!/bin/bash

# Deployment Status Checker Script
# This script checks the status of deployments and pending approvals

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
REPO_OWNER="octoo-tech"
REPO_NAME="octoo-static"
GITHUB_REPO="$REPO_OWNER/$REPO_NAME"

echo -e "${BLUE}🚀 Octoo Static Deployment Status${NC}"
echo "=================================="

# Check if GitHub CLI is installed
if ! command -v gh &> /dev/null; then
    echo -e "${YELLOW}⚠️  GitHub CLI not found. Please install it for full functionality.${NC}"
    echo "   Install: https://cli.github.com/"
    echo ""
fi

# Function to check pending deployments
check_pending_deployments() {
    echo -e "${BLUE}📋 Checking for pending deployments...${NC}"
    
    if command -v gh &> /dev/null; then
        # Get pending deployments using GitHub CLI
        PENDING=$(gh api repos/$GITHUB_REPO/deployments \
            --jq '.[] | select(.environment == "us-deployment" and .statuses_url) | {id: .id, ref: .ref, environment: .environment, created_at: .created_at}' \
            2>/dev/null || echo "[]")
        
        if [ "$PENDING" != "[]" ] && [ -n "$PENDING" ]; then
            echo -e "${YELLOW}⏳ Pending US deployment found!${NC}"
            echo "$PENDING"
        else
            echo -e "${GREEN}✅ No pending deployments${NC}"
        fi
    else
        echo "   GitHub CLI not available - check manually at:"
        echo "   https://github.com/$GITHUB_REPO/actions"
    fi
}

# Function to get recent workflow runs
check_recent_workflows() {
    echo ""
    echo -e "${BLUE}🔄 Recent workflow runs:${NC}"
    
    if command -v gh &> /dev/null; then
        gh run list --repo $GITHUB_REPO --limit 5 --json status,conclusion,name,createdAt,url \
            --template '{{range .}}{{.name}} - {{.status}} {{if .conclusion}}({{.conclusion}}){{end}} - {{timeago .createdAt}} - {{.url}}
{{end}}' 2>/dev/null || echo "   Unable to fetch workflow runs"
    else
        echo "   Check at: https://github.com/$GITHUB_REPO/actions"
    fi
}

# Function to show deployment environments
show_environments() {
    echo ""
    echo -e "${BLUE}🌍 Deployment environments:${NC}"
    echo "   PRO Stack: Automatic deployment after tests"
    echo "   US Stack:  Manual approval required"
    echo ""
    echo "   Environment URL: https://github.com/$GITHUB_REPO/settings/environments"
}

# Function to show approval instructions
show_approval_instructions() {
    echo ""
    echo -e "${YELLOW}👤 How to approve deployments:${NC}"
    echo "   1. Go to: https://github.com/$GITHUB_REPO/actions"
    echo "   2. Click on the running workflow"
    echo "   3. Look for 'Review deployments' button"
    echo "   4. Click 'Review deployments'"
    echo "   5. Select 'Approve' or 'Reject'"
    echo "   6. Add optional comment"
    echo "   7. Click 'Approve deployment'"
}

# Notification functions removed - keeping only status checking

# Email notification function removed

# Main execution
main() {
    check_pending_deployments
    check_recent_workflows
    show_environments
    show_approval_instructions

    echo ""
    echo -e "${GREEN}📋 Deployment status check complete!${NC}"
    echo ""
    echo "💡 Tips:"
    echo "   • Install GitHub CLI (gh) for enhanced functionality"
    echo "   • Check GitHub Actions tab for workflow status"
    echo "   • Review deployments at: https://github.com/$GITHUB_REPO/actions"
}

# Run the script
main "$@"
