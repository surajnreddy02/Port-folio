import { APP_VERSION, PDF_VERSION, getCacheBustedUrl } from '../utils/version';

describe('version utils', () => {
  it('returns correct app version', () => {
    expect(APP_VERSION).toMatch(/^\d+\.\d+\.\d+$/);
  });

  it('returns correct pdf version', () => {
    expect(PDF_VERSION).toMatch(/^\d+\.\d+\.\d+$/);
  });

  it('appends version as query param for app', () => {
    const url = 'file.pdf';
    expect(getCacheBustedUrl(url)).toContain(`?v=${APP_VERSION}`);
  });

  it('appends version as query param for pdf', () => {
    const url = 'file.pdf';
    expect(getCacheBustedUrl(url, 'pdf')).toContain(`?v=${PDF_VERSION}`);
  });

  it('uses & if url already has query', () => {
    const url = 'file.pdf?foo=bar';
    expect(getCacheBustedUrl(url)).toContain(`&v=${APP_VERSION}`);
  });
});
