# Security Policy

## Supported Versions

Currently supported versions for security updates:

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |

## Reporting a Vulnerability

If you discover a security vulnerability in this portfolio project, please report it responsibly:

1. **Do not** open a public GitHub issue
2. Email the maintainer directly at: surajnreddy02pro@gmail.com
3. Include:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if any)

## Security Features

This portfolio implements the following security measures:

### Backend Security
- Input validation and sanitization
- Rate limiting on contact form submissions
- Environment variable protection for sensitive data
- Secure SMTP configuration
- Error message sanitization

### Frontend Security
- Content Security Policy (CSP) implementation
- XSS protection headers
- Frame options protection
- Client-side input sanitization
- Rate limiting on form submissions

### Infrastructure Security
- HTTPS enforcement
- Secure cookie policies
- CORS configuration
- Static file security headers
- PDF frame security

## Security Headers

The following security headers are implemented:

- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Strict-Transport-Security: max-age=31536000; includeSubDomains`
- `Content-Security-Policy: [strict policy]`
- `Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=()`

## Regular Security Maintenance

- Dependencies are regularly updated using `npm audit`
- Security vulnerabilities are addressed promptly
- Code is reviewed for security best practices
- Monitoring for new security threats
