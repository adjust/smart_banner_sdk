import { SmartBannerData, Localization } from '@sdk/data/types';
import { convertSmartBannerToTracker } from '@sdk/data/converters/smart-banner-to-tracker-data';

describe('Convertation of SmartBannerData to TrackerData', () => {

  const trackerData = {
    template: 'https://whatever',
    context: {
      domain: 'app.adjust.com',
      tracker: 'qtzy19',
      campaign: 'banner test 2',
      adgroup: 'en'
    }
  };

  const localizationContext = {
    adgroup: 'ru'
  };

  const localizations = {
    ru: {
      title: 'мой заголовок',
      description: 'мое описание',
      buttonText: 'нажми',
      context: localizationContext
    } as Localization
  } as { [key: string]: Localization };

  const bannerData = { trackerUrl: trackerData, localizations } as SmartBannerData;

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
