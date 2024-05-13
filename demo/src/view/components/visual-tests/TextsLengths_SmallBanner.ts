import { SmartBannerLayoutFactory, SmartBannerViewData } from '@adjustcom/smart-banner-sdk-layout';

import json from '../../../../../fake-data/visual-tests/texts-lengths-in-small-banner.json';

const records = json as any as SmartBannerViewData[];

export function TextsLengths_SmallBanner(banners: SmartBannerViewData[] = records) {
  const render = (appRoot: HTMLElement) => {

    const root = document.createElement('div');
    root.style.height = '100vh';
    root.style.display = 'flex';
    root.style.flexDirection = 'column';
    root.style.flexWrap = 'wrap';

    const elements: HTMLElement[] = [];

    for (let record of banners) {
      const elem = document.createElement('div');
      elem.style.padding = '3px';

      const preview = SmartBannerLayoutFactory.createPreview(record);
      preview.render(elem);

      elements.push(elem);
    }

    root.append(...elements);
    appRoot.append(root);
  };

  return { render };
}
