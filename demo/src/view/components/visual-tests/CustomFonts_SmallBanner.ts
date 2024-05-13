import { SmartBannerLayoutFactory, SmartBannerViewData } from '@adjustcom/smart-banner-sdk-layout';

import json from '../../../../../fake-data/visual-tests/custom-fonts-in-small-banner.json';

const records = json as any as SmartBannerViewData[];

export function CustomFonts_SmallBanner(banners: SmartBannerViewData[] = records) {
  let index = 0;

  const render = (appRoot: HTMLElement) => {

    const root = document.createElement('div');
    root.style.height = '100vh';
    root.style.display = 'flex';
    root.style.flexDirection = 'column';
    root.style.flexWrap = 'wrap';

    const elem = document.createElement('div');
    elem.style.padding = '3px';
    const preview = SmartBannerLayoutFactory.createPreview(banners[0]);
    preview.render(elem);

    const updateButton = document.createElement('button');
    updateButton.innerText = "Next banner";
    updateButton.addEventListener('click', () => {
      index++;
      if (index >= banners.length) {
        index = 0;
      }

      preview.update(banners[index])
    })

    root.appendChild(elem);
    root.appendChild(updateButton);

    appRoot.append(root);
  };

  return { render };
}
