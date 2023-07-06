import { convertResponseToSmartBanners } from '@sdk/data/converters/response-to-smart-banners';
import { BannerSize, Position, SmartBannerData, SmartBannerResponseData } from '@sdk/data/types';

import serverResponseMock from '../../../fake-data/smart_banners_mock.json';
import { snakeToCamelCase } from '@sdk/utils/snake-to-camel-case';

const dataMock = serverResponseMock as any as SmartBannerResponseData[];

describe('Convertation of server responce to SmartBannerData', () => {
  it('converts', () => {
    const actual = convertResponseToSmartBanners(dataMock);

    const expected = []
    for (let item of dataMock) {
      expected.push({ ...snakeToCamelCase(item), appName: '' })
    }

    expect(actual).toEqual(expected);
  });

  it('replaces buttonLabel with buttonText', () => {
    const text = 'Click me!'
    const [{ button_text, ...rest }] = dataMock; // removing button_text from testing data
    const data = [{ ...rest, button_label: text }] // adding button_label instead

    const actual = convertResponseToSmartBanners(data) as SmartBannerData[]

    const expected = []
    for (let item of dataMock) {
      expected.push({ ...snakeToCamelCase(item), buttonText: text, appName: '' })
    }

    expect(actual).toEqual(expected);
    expect(actual[0].buttonText).toBe(text);
  });

  it('adds missing properties which are mandatory', () => {
    const data = [
      { app_name: 'Hello Kitty' } as SmartBannerResponseData,
      { description: 'Meow-meow' } as SmartBannerResponseData
    ]

    const expected = [
      {
        position: Position.Top,
        size: BannerSize.Small,
        appName: 'Hello Kitty',
        title: '',
        buttonText: '',
        dismissalPeriod: 86400
      },
      {
        description: 'Meow-meow',
        position: Position.Top,
        size: BannerSize.Small,
        appName: '',
        title: '',
        buttonText: '',
        dismissalPeriod: 86400
      }
    ]

    expect(convertResponseToSmartBanners(data)).toEqual(expected)
  });

  it('returns null if empty array passed', () => {
    expect(convertResponseToSmartBanners([])).toBeNull()
  })
});
