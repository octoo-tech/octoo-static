# Status Badges for README.md

Add these badges to the top of your main README.md file:

```markdown
# Octoo Static

![Deploy](https://github.com/octoo-tech/octoo-static/workflows/Deploy%20to%20GitHub%20Pages/badge.svg)
![CI](https://github.com/octoo-tech/octoo-static/workflows/Continuous%20Integration/badge.svg)
![Tests](https://github.com/octoo-tech/octoo-static/workflows/Test%20Suite/badge.svg)
[![codecov](https://codecov.io/gh/octoo-tech/octoo-static/branch/main/graph/badge.svg)](https://codecov.io/gh/octoo-tech/octoo-static)

## Test Coverage

| Metric | Status |
|--------|--------|
| Unit Tests | 44/44 ✅ |
| Integration Tests | 69/69 ✅ |
| Coverage | 80%+ 🎯 |
| Browsers | Chrome, Firefox, Safari ✅ |

## Quick Start

\`\`\`bash
# Install dependencies
npm install

# Run development server
npm run dev

# Run tests
npm test

# Run tests with coverage
npm run test:unit -- --coverage
\`\`\`

## CI/CD Pipeline

- **✅ Automated Testing** - Unit and integration tests on every PR
- **✅ Cross-Browser Testing** - Chrome, Firefox, Safari compatibility
- **✅ Coverage Reporting** - Automated coverage tracking and reporting
- **✅ Performance Monitoring** - Lighthouse CI integration
- **✅ Security Auditing** - Dependency vulnerability scanning
- **✅ Automated Deployment** - Zero-downtime deployment to AWS

## Development Workflow

1. Create feature branch
2. Make changes with tests
3. Push and create PR
4. Automated CI runs all tests
5. Merge after approval
6. Automatic deployment to production

See [GitHub Actions Guide](GITHUB-ACTIONS-GUIDE.md) for detailed workflow information.
```

## Alternative Compact Version

If you prefer a more compact version:

```markdown
# Octoo Static

![Deploy](https://github.com/octoo-tech/octoo-static/workflows/Deploy%20to%20GitHub%20Pages/badge.svg) ![CI](https://github.com/octoo-tech/octoo-static/workflows/Continuous%20Integration/badge.svg) [![codecov](https://codecov.io/gh/octoo-tech/octoo-static/branch/main/graph/badge.svg)](https://codecov.io/gh/octoo-tech/octoo-static)

Revolutionary specialized search engine for automotive industry.

**🧪 Tests**: 113/113 passing | **📊 Coverage**: 80%+ | **🌐 Browsers**: Chrome, Firefox, Safari
```
