import { Platform, getPlatform } from '@sdk/utils/detect-platform';

describe('Detect device platform', () => {
  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('returns undefined when no platform available', () => {
    jest.spyOn(global.navigator, 'userAgent', 'get').mockReturnValue(undefined as any);
    jest.spyOn(global.navigator, 'userAgentData', 'get').mockReturnValue(undefined as any);

    expect(getPlatform()).toEqual(undefined);
  });

  it('returns undefined when userAgent does not match iOS or Android', () => {
    const userAgent = 'Mozilla/5.0 (X11; Linux x86_64; rv:45.0) Gecko/20100101 Thunderbird/45.8.0';
    jest.spyOn(global.navigator, 'userAgent', 'get').mockReturnValueOnce(userAgent);

    expect(getPlatform()).toEqual(undefined);
  });

  it('returns undefined when userAgentData.platform does not match iOS or Android', () => {
    const userAgentData = { platform: 'Win64' } as NavigatorUAData;
    jest.spyOn(global.navigator, 'userAgentData', 'get').mockReturnValueOnce(userAgentData);

    expect(getPlatform()).toEqual(undefined);
  });

  test.each([
    'Mozilla/5.0 (iPhone; CPU iPhone OS 17_7_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/136.0.7103.56 Mobile/15E148 Safari/604.1',
    'Mozilla/5.0 (iPad; CPU OS 12_4_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.1.2 Mobile/15E148 Safari/604.1',
    'Mozilla/5.0 (iPod touch; CPU iPhone OS 10_3_2 like Mac OS X) AppleWebKit/603.2.4 (KHTML, like Gecko) Version/10.0 Mobile/14F89 Safari/602.1'
  ])('returns iOS when userAgent matches "iPhone/iPad/iPod" (%s)', (userAgent: string) => {
    jest.spyOn(global.navigator, 'userAgent', 'get').mockReturnValueOnce(userAgent);
    expect(getPlatform()).toEqual(Platform.iOS);
  });

  it('returns iOS when userAgent matches "Mac OS" and touch screen is available', () => {
    const userAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Safari/605.1.1';
    jest.spyOn(global.navigator, 'userAgent', 'get').mockReturnValueOnce(userAgent);
    jest.spyOn(window.navigator, 'maxTouchPoints', 'get').mockReturnValueOnce(5);

    expect(getPlatform()).toEqual(Platform.iOS);
  });

  it('returns undefined when userAgent matches "Mac OS" and touch screen is NOT available', () => {
    const userAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Safari/605.1.1';
    jest.spyOn(global.navigator, 'userAgent', 'get').mockReturnValueOnce(userAgent);
    jest.spyOn(window.navigator, 'maxTouchPoints', 'get').mockReturnValueOnce(0);

    expect(getPlatform()).toEqual(undefined);
  });

  it('returns Android when userAgent matches "Android"', () => {
    const userAgent = 'Mozilla/5.0 (Linux; Android 10; SAMSUNG SM-G975U) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/11.1 Chrome/75.0.3770.143 Mobile Safari/537.36';
    jest.spyOn(global.navigator, 'userAgent', 'get').mockReturnValueOnce(userAgent);

    expect(getPlatform()).toEqual(Platform.Android);
  });

  it('returns Android when userAgentData.platform matches "Android"', () => {
    const userAgentData = { platform: 'Android' } as NavigatorUAData;
    jest.spyOn(global.navigator, 'userAgentData', 'get').mockReturnValueOnce(userAgentData);

    expect(getPlatform()).toEqual(Platform.Android);
  });

  it('returns Android when userAgent matches "Linux" and touch screen is available', () => {
    const userAgentData = { platform: 'Linux' } as NavigatorUAData;
    jest.spyOn(global.navigator, 'userAgentData', 'get').mockReturnValueOnce(userAgentData);
    jest.spyOn(window.navigator, 'maxTouchPoints', 'get').mockReturnValueOnce(5);

    expect(getPlatform()).toEqual(Platform.Android);
  });

  it('returns undefined when userAgent matches "Linux" and touch screen is NOT available', () => {
    const userAgent = 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:40.0) Gecko/20100101 Firefox/40.0';
    jest.spyOn(global.navigator, 'userAgent', 'get').mockReturnValueOnce(userAgent);
    jest.spyOn(window.navigator, 'maxTouchPoints', 'get').mockReturnValueOnce(0);

    expect(getPlatform()).toEqual(undefined);
  });

  it('returns Android when userAgentData.platform matches "Linux" and touch screen is available', () => {
    const userAgentData = { platform: 'Linux' } as NavigatorUAData;
    jest.spyOn(global.navigator, 'userAgentData', 'get').mockReturnValueOnce(userAgentData);
    jest.spyOn(window.navigator, 'maxTouchPoints', 'get').mockReturnValueOnce(5);

    expect(getPlatform()).toEqual(Platform.Android);
  });

  it('returns undefined when userAgentData.platform matches "Linux" and touch screen is NOT available', () => {
    const userAgentData = { platform: 'Linux' } as NavigatorUAData;
    jest.spyOn(global.navigator, 'userAgentData', 'get').mockReturnValueOnce(userAgentData);
    jest.spyOn(window.navigator, 'maxTouchPoints', 'get').mockReturnValueOnce(0);

    expect(getPlatform()).toEqual(undefined);
  });
});
