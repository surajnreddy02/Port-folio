// Version configuration for cache busting
export const APP_VERSION = '1.0.1'; // Increment this when deploying updates
export const PDF_VERSION = '1.0.1'; // Increment this when updating the PDF

export const getCacheBustedUrl = (url: string, type: 'app' | 'pdf' = 'app') => {
  const version = type === 'pdf' ? PDF_VERSION : APP_VERSION;
  const separator = url.includes('?') ? '&' : '?';
  return `${url}${separator}v=${version}`;
};
