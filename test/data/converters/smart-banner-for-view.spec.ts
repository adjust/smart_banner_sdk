import { Context, Localization, SmartBannerData } from '@sdk/data/types';
import { convertSmartBannerDataForView } from '@sdk/data/converters/smart-banner-for-view';
import { BannerSize, Position } from '@layout';
import { snakeToCamelCase } from '@sdk/utils/snake-to-camel-case';

import 'jest-extended';

describe('Convertation of SmartBannerData to SmartBannerViewData', () => {

  const rest = {
    id: 'id',
    name: 'name',
    is_previous_attribution_priority: false,
    display_rule: null,
    default_language: '',
    tracker_url: {
      template: '',
      context: {}
    },
    dismissal_period: 1
  };

  const viewData = {
    app_name: 'App',
    title: 'my title',
    description: 'my description',
    button_text: 'click',
    position: Position.Top,
    size: BannerSize.Small,
    button_color: '#000000',
    background_color: '#000000',
    background_image_url: 'None',
    title_color: '#FFFF80',
    description_color: '#FF66FF',
    icon_url: 'https://www.apptrace.com/api/app/1386566985/artwork_url_small'
  };

  const expectedViewData = snakeToCamelCase(viewData)

  const localizedContext = {
    context: {
      adgroup: 'ru'
    } as Context
  };

  const translations = {
    title: 'мой заголовок',
    description: 'мое описание',
    buttonText: 'нажми',
  };

  const localizations = { ru: { ...translations, ...localizedContext } as any as Localization };

  const banner = { ...rest, ...viewData, localizations } as any as SmartBannerData;

  it('converts data with a default locale', () => {
    const result = convertSmartBannerDataForView(banner);

    expect(result).toEqual(expectedViewData);
  });

  it('converts data with custom locale', () => {
    const result = convertSmartBannerDataForView(banner, 'ru');

    const expected = { ...expectedViewData, ...translations };

    expect(result).toEqual(expected);
  });

  it('converts data with a default locale when desired one was not found', () => {
    const result = convertSmartBannerDataForView(banner, 'tr');

    expect(result).toEqual(expectedViewData);
  });
});
