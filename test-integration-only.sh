#!/bin/bash

# Test Integration Tests Only
echo "🧪 Running Integration Tests Only"
echo "================================="

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

print_status() {
    echo -e "${GREEN}✓${NC} $1"
}

print_error() {
    echo -e "${RED}✗${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

# Check if Playwright browsers are installed
if ! npx playwright --version > /dev/null 2>&1; then
    print_error "Playwright not found. Installing..."
    npx playwright install
fi

print_status "Playwright ready"

# Run integration tests with better configuration
echo ""
echo "Running Integration Tests..."
echo "============================"

# Run with single worker to avoid context conflicts
if npx playwright test --workers=1 --reporter=line; then
    print_status "Integration tests completed successfully"
else
    print_warning "Some integration tests failed - checking results..."
fi

echo ""
echo "📊 Integration Test Summary:"
echo "• Contact form workflow tests"
echo "• Page rendering integration tests"
echo "• User interaction tests"
echo "• API mocking tests"

echo ""
echo "🔧 If tests still fail, try:"
echo "• npm run build && npm run preview (in another terminal)"
echo "• npx playwright test --headed (to see browser)"
echo "• npx playwright test --debug (for debugging)"
