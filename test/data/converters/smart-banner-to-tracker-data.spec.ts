import { SmartBannerData, Localization } from '@sdk/data/types';
import { convertSmartBannerToTracker } from '@sdk/data/converters/smart-banner-to-link-data';

describe('Convertation of SmartBannerData to TrackerData', () => {

  const trackerData = {
    template: 'https://whatever',
    context: {
      domain: 'app.adjust.com',
      tracker: 'qtzy19',
      campaign: 'banner test 2',
      localization_language: 'en'
    }
  };

  const localizationContext = {
    localization_language: 'ru'
  };

  const localizations = {
    ru: {
      title: 'мой заголовок',
      description: 'мое описание',
      button_text: 'нажми',
      context: localizationContext
    } as Localization
  } as { [key: string]: Localization };

  const bannerData = { tracker_url: trackerData, localizations } as SmartBannerData;

  it('converts data with default locale', () => {
    expect(convertSmartBannerToTracker(bannerData)).toEqual(trackerData);
  });

  it('converts data considering locale', () => {
    const expected = {
      template: trackerData.template,
      context: { ...trackerData.context, ...localizationContext }
    };

    expect(convertSmartBannerToTracker(bannerData, 'ru')).toEqual(expected);
  });
});
