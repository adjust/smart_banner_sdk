import { Localization, SmartBannerData } from '@sdk/data/types';
import { convertSmartBannerDataForView } from '@sdk/data/converters/smart-banner-for-view';
import { BannerSize, Position } from '@layout/src/data-types';

import 'jest-extended';

describe('Convertation of SmartBannerData to SmartBannerViewData', () => {

  const rest = {
    id: 'id',
    name: 'name',
    isPreviousAttributionPriority: false,
    displayRule: null,
    defaultLanguage: '',
    trackerUrl: {
      template: '',
      context: {}
    },
    dismissalPeriod: 1
  };

  const viewData = {
    title: 'my title',
    description: 'my description',
    buttonLabel: 'click',
    position: Position.Top,
    size: BannerSize.Small,
    buttonColor: '#000000',
    backgroundColor: '#000000',
    backgroundImageUrl: 'None',
    titleColor: '#FFFF80',
    descriptionColor: '#FF66FF',
    iconUrl: 'https://www.apptrace.com/api/app/1386566985/artwork_url_small',
  };

  const localizedContext = {
    context: {
      adgroup: 'ru'
    }
  };

  const translations = {
    title: 'мой заголовок',
    description: 'мое описание',
    buttonLabel: 'нажми',
  };

  const localizations = { ru: { ...translations, ...localizedContext } as Localization };

  const banner = { ...rest, ...viewData, localizations } as SmartBannerData;

  it('converts data with a default locale', () => {
    const result = convertSmartBannerDataForView(banner);

    expect(result).toEqual(viewData);
  });

  it('converts data with custom locale', () => {
    const result = convertSmartBannerDataForView(banner, 'ru');

    const expected = { ...viewData, ...translations };

    expect(result).toEqual(expected);
  });

  it('converts data with a default locale when desired one was not found', () => {
    const result = convertSmartBannerDataForView(banner, 'tr');

    expect(result).toEqual(viewData);
  });
});
