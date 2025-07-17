# Test Commands Reference

## 🧪 **Updated Test Scripts**

### **Main Test Commands**

```bash
# Run all tests (unit + integration) with single worker
npm test

# Run comprehensive test suite with coverage
./run-tests.sh
```

### **Unit Tests**

```bash
# Development mode (watch for changes)
npm run test:unit

# Run once (CI mode)
npm run test:unit:ci

# Run with coverage report
npm run test:unit:coverage
```

### **Integration Tests**

```bash
# Run integration tests (single worker for reliability)
npm run test:integration

# Run with minimal output (CI mode)
npm run test:integration:ci

# Run with visible browser (debugging)
npm run test:integration:headed

# Run with interactive UI
npm run test:integration:ui
```

## 🔧 **Worker Configuration Fixed**

### **Before (Multiple Workers)**
- `npm test` used 5 workers by default
- Could cause browser context conflicts
- Inconsistent test results

### **After (Single Worker)**
- All tests now use `--workers=1` by default
- Reliable test execution
- Consistent results every time

## 🎯 **Recommended Usage**

### **During Development**
```bash
# Watch unit tests while coding
npm run test:unit

# Quick integration test check
npm run test:integration:ci

# Debug failing integration tests
npm run test:integration:headed
```

### **Before Committing**
```bash
# Run full test suite
npm test

# Or use the comprehensive script
./run-tests.sh
```

### **Debugging Tests**
```bash
# Visual debugging for integration tests
npm run test:integration:ui

# Run specific test file
npx playwright test tests/integration/contact-form.spec.ts

# Run specific unit test
npm run test:unit -- src/lib/EmailForm.test.ts
```

## 📊 **Test Execution Times**

With single worker configuration:
- **Unit Tests**: ~5-10 seconds
- **Integration Tests**: ~30-60 seconds  
- **Full Test Suite**: ~45-75 seconds

## 🚀 **Performance vs Reliability**

### **Single Worker Benefits**
- ✅ **Reliable**: No browser context conflicts
- ✅ **Consistent**: Same results every run
- ✅ **Debuggable**: Easier to troubleshoot failures
- ✅ **Resource Friendly**: Lower memory usage

### **Trade-offs**
- ⏱️ **Slower**: Takes longer than parallel execution
- 🔄 **Sequential**: Tests run one after another

## 🎮 **Advanced Commands**

```bash
# Run tests for specific browser only
npx playwright test --project=chromium

# Run tests with custom timeout
npx playwright test --timeout=60000

# Run tests matching pattern
npx playwright test --grep="contact form"

# Generate and open HTML report
npx playwright test && npx playwright show-report
```

## 🔍 **Troubleshooting**

### **If Tests Still Use Multiple Workers**
```bash
# Force single worker
npx playwright test --workers=1

# Check current configuration
npx playwright test --list
```

### **If Integration Tests Fail**
```bash
# Run with debug output
npm run test:integration:headed

# Check browser installation
npx playwright install --with-deps
```

The updated configuration ensures reliable, consistent test execution with single worker mode by default! 🎯
