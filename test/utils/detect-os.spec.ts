import { Platform, getPlatform } from '@sdk/utils/detect-platform';

describe('Returns device platform', () => {
  afterAll(() => {
    jest.restoreAllMocks();
  });

  const testSet: [string, Platform | undefined][] = [
    [
      'Mozilla/5.0 (Linux; Android 10; SAMSUNG SM-G975U) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/11.1 Chrome/75.0.3770.143 Mobile Safari/537.36',
      Platform.Android
    ],
    [
      'Mozilla/5.0 (iPad; CPU OS 12_4_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.1.2 Mobile/15E148 Safari/604.1',
      Platform.iOS
    ],
    [
      'Mozilla/5.0 (X11; Linux x86_64; rv:45.0) Gecko/20100101 Thunderbird/45.8.0',
      undefined
    ],
  ];

  test.each(testSet)('getPlatform() for %s returns %s', (userAgent: string, expected: Platform | undefined) => {
    jest.spyOn(global.navigator, 'userAgent', 'get').mockReturnValue(userAgent);
    expect(getPlatform()).toEqual(expected);
  });

});
