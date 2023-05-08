import { BlockedUrlBypass } from '../../../src/network/url-strategy/blocked-url-bypass';
import { BaseUrlsMap } from '../../../src/network/url-strategy/url-strategy';

describe('BlockedUrlBypass', () => {
  const testEndpoints: Record<BlockedUrlBypass.Strategy, BaseUrlsMap> = {
    [BlockedUrlBypass.Default]: {
      endpointName: BlockedUrlBypass.Default,
      app: 'app',
      gdpr: 'gdpr'
    },
    [BlockedUrlBypass.India]: {
      endpointName: 'Indian',
      app: 'app.adjust.net.in',
      gdpr: 'gdpr.adjust.net.in'
    },
    [BlockedUrlBypass.China]: {
      endpointName: 'Chinese',
      app: 'app.adjust.world',
      gdpr: 'gdpr.adjust.world'
    }
  };

  const testCases: Array<[BlockedUrlBypass.Strategy, number, BlockedUrlBypass.Strategy[]]> = [
    [BlockedUrlBypass.China, 2, [BlockedUrlBypass.Default]],
    [BlockedUrlBypass.India, 2, [BlockedUrlBypass.Default]],
    [BlockedUrlBypass.Default, 3, [BlockedUrlBypass.India, BlockedUrlBypass.China]],
  ];

  it.each(testCases)('returns urls map array depending on strategy', (strategy: BlockedUrlBypass.Strategy, retriesNumber, nextEndpoints) => {
    const resultingFn = BlockedUrlBypass.preferredUrlsGetter(strategy, testEndpoints);

    expect(resultingFn).toEqual(expect.any(Function));

    const baseUrlsMap = resultingFn();

    expect(baseUrlsMap.length).toEqual(retriesNumber);
    expect(baseUrlsMap[0]).toEqual(testEndpoints[strategy]);

    for (let i = 0; i < nextEndpoints.length; i++) {
      const a = nextEndpoints[i];
      expect(baseUrlsMap[i + 1]).toEqual(testEndpoints[nextEndpoints[i]]);
    }
  });

  it('returns default strategy if option is undefined', () => {
    const resultingFn = BlockedUrlBypass.preferredUrlsGetter(undefined, testEndpoints);

    expect(resultingFn).toEqual(expect.any(Function));

    const baseUrlsMap = resultingFn();

    expect(baseUrlsMap.length).toEqual(3);
    expect(baseUrlsMap[0]).toEqual(testEndpoints[BlockedUrlBypass.Default]);
    expect(baseUrlsMap[1]).toEqual(testEndpoints[BlockedUrlBypass.India]);
    expect(baseUrlsMap[2]).toEqual(testEndpoints[BlockedUrlBypass.China]);
  });
});
