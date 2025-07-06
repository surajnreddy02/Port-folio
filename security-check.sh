#!/bin/bash

# Security Maintenance Script for Portfolio Project
# Run this script monthly to maintain security

echo "🔒 Portfolio Security Maintenance Check"
echo "======================================"

# Check for dependency vulnerabilities
echo "1. Checking dependencies..."
npm audit

# Check for outdated packages
echo -e "\n2. Checking for outdated packages..."
npm outdated

# Check if .env file is properly ignored
echo -e "\n3. Checking .env file security..."
if git check-ignore .env > /dev/null 2>&1; then
    echo "✅ .env file is properly ignored"
else
    echo "⚠️  WARNING: .env file might not be ignored!"
fi

# Check for sensitive files in git
echo -e "\n4. Checking for sensitive files..."
if git log --all --full-history -- .env > /dev/null 2>&1; then
    echo "⚠️  WARNING: .env file found in git history!"
else
    echo "✅ No sensitive files found in git history"
fi

# Check build for security
echo -e "\n5. Running build test..."
npm run build

echo -e "\n🔒 Security check complete!"
echo "Remember to:"
echo "  - Review any vulnerabilities above"
echo "  - Update dependencies regularly"
echo "  - Monitor for new security advisories"
echo "  - Keep environment variables secure"
