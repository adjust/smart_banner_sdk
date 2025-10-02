import { convertResponseToSmartBanners } from '@sdk/data/converters/response-to-smart-banners';
import { BannerSize, Position, SmartBannerData, SmartBannerResponseData } from '@sdk/data/types';

import serverResponseMock from '../../../fake-data/smart_banners_mock.json';

const dataMock = serverResponseMock as any as SmartBannerResponseData[];

describe('Convertation of server responce to SmartBannerData', () => {
  it('converts', () => {
    const actual = convertResponseToSmartBanners(dataMock)?.banners;

    const expected = [];
    for (const item of dataMock) {
      expected.push({ ...item, app_name: '' });
    }

    expect(actual).toEqual(expected);
  });

  it('replaces button_label with button_text', () => {
    const text = 'Click me!';
    const [{ button_text: _button_text, ...rest }] = dataMock; // removing button_text from testing data
    const data = [{ ...rest, button_label: text }]; // adding button_label instead

    const actual = convertResponseToSmartBanners(data)?.banners as SmartBannerData[];

    const expected = [];
    for (const item of dataMock) {
      expected.push({ ...item, button_text: text, app_name: '' });
    }

    expect(actual[0].button_text).toBe(text);
    expect(actual).toEqual(expected);
  });

  it('adds missing properties which are mandatory', () => {
    const data = [
      { app_name: 'Hello Kitty' } as SmartBannerResponseData,
      { description: 'Meow-meow' } as SmartBannerResponseData
    ];

    const expected = [
      {
        position: Position.Top,
        size: BannerSize.Small,
        app_name: 'Hello Kitty',
        title: '',
        button_text: '',
        dismissal_period: 86400
      },
      {
        description: 'Meow-meow',
        position: Position.Top,
        size: BannerSize.Small,
        app_name: '',
        title: '',
        button_text: '',
        dismissal_period: 86400
      }
    ];

    expect(convertResponseToSmartBanners(data)?.banners).toEqual(expected);
  });

  it('returns null if empty array passed', () => {
    expect(convertResponseToSmartBanners([])).toBeNull();
  });
});
