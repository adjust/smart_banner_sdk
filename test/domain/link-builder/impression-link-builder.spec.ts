import { Context } from '@sdk/data/types';
import { ImpressionLinkBuilder } from '@sdk/domain/link-builder/impression-link-builder';

describe('Smart Banners impression link building', () => {
  const commonContext: Context = {
    domain: 'test.domain',
    tracker: 'abc123',
    campaign: 'backend_campaign',
    localization_language: 'en'
  };

  it('builds an impression link using backend context', () => {
    const impressionData = {
      impression_url: 'https://{domain}/impression?tracker={tracker}&campaign={campaign}',
      context: commonContext
    };

    const impression = ImpressionLinkBuilder.build(impressionData, 'https://some-path/', {});

    expect(impression).toBe('https://test.domain/impression?tracker=abc123&campaign=backend_campaign');
  });

  it('uses URL parameters not provided by backend context', () => {
    const impressionData = {
      impression_url: 'https://{domain}/impression?source={utm_source}&content={utm_content}',
      context: commonContext
    };

    const impression = ImpressionLinkBuilder.build(
      impressionData,
      'https://some-path/?utm_source=website&utm_content=banner',
      {}
    );

    expect(impression).toBe('https://test.domain/impression?source=website&content=banner');
  });

  it('prefers backend context over potentially malicious URL parameters', () => {
    const impressionData = {
      impression_url: 'https://{domain}/impression?source={utm_source}&campaign={campaign}',
      context: {
        ...commonContext,
        utm_source: 'trusted_backend_source'
      }
    };

    const impression = ImpressionLinkBuilder.build(
      impressionData,
      'https://some-path/?utm_source=malicious_url_source&campaign=malicious_url_campaign',
      {}
    );

    expect(impression).toBe('https://test.domain/impression?source=trusted_backend_source&campaign=backend_campaign');
  });

  it('prefers custom context over backend context and URL parameters', () => {
    const impressionData = {
      impression_url: 'https://{domain}/impression?source={utm_source}&campaign={campaign}',
      context: {
        ...commonContext,
        utm_source: 'trusted_backend_source'
      }
    };

    const impression = ImpressionLinkBuilder.build(
      impressionData,
      'https://some-path/?utm_source=malicious_url_source&campaign=malicious_url_campaign',
      { context: { utm_source: 'custom_source', campaign: 'custom_campaign' } }
    );

    expect(impression).toBe('https://test.domain/impression?source=custom_source&campaign=custom_campaign');
  });
});
