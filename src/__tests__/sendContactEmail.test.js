const { handler } = require('../../netlify/functions/sendContactEmail.cjs');

describe('sendContactEmail handler', () => {
  it('returns 405 for non-POST requests', async () => {
  const event = { httpMethod: 'GET', headers: {} };
    const result = await handler(event, {});
    expect(result.statusCode).toBe(405);
  });

  it('returns 400 for invalid JSON', async () => {
  const event = { httpMethod: 'POST', headers: {}, body: '{invalid}' };
    const result = await handler(event, {});
    expect(result.statusCode).toBe(400);
  });

  it('returns 400 for missing fields', async () => {
  const event = { httpMethod: 'POST', headers: {}, body: JSON.stringify({ name: '', email: '', message: '' }) };
    const result = await handler(event, {});
    expect(result.statusCode).toBe(400);
  });

  it('returns 400 for invalid email', async () => {
  const event = { httpMethod: 'POST', headers: {}, body: JSON.stringify({ name: 'Test', email: 'bad', message: 'Hello' }) };
    const result = await handler(event, {});
    expect(result.statusCode).toBe(400);
  });

  // More tests can be added for rate limiting, sanitization, and success cases with mocks
});
