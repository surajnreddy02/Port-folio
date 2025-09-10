# TESTING.md

## Testing Strategy

This project uses **Jest** and **React Testing Library** for unit and integration tests.

### Frontend
- All React components are tested for rendering, props, and user interactions.
- Main app flow (loading, section navigation) is covered in `App.test.tsx`.
- Edge cases (missing props, error boundaries) should be tested for each component.

### Backend
- The Netlify function `sendContactEmail.cjs` is tested for:
  - HTTP method validation
  - Input validation and sanitization
  - Rate limiting (mocked)
  - Success and error responses

### Coverage
- Critical paths (form submission, navigation, animation triggers) are covered.
- Error handling and edge cases are included in tests.
- More tests can be added for integration between frontend and backend (e.g., form submission).

## Running Tests

```sh
npm test
```

## Improvements Suggested
- Use Redis or similar for production rate limiting.
- Add more integration tests for user flows.
- Consider e2e tests with Cypress or Playwright for full user journey.
- Monitor and log failed backend attempts for security.
- Review security headers and CSP for frontend.
