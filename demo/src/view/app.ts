import { Header } from './components/header';
import { Content } from './components/content';

import AdjustSmartBanner from '@adjustcom/smart-banner-sdk';

export function App() {
  const fixedHeader = false;

  const render = () => {
    const elements: HTMLElement[] = [];

    const content = Content({ fixedHeader });

    elements.push(Header({
      fixed: fixedHeader,
      onHeaderModeChanged: (fixed: boolean) => content.setHeaderMode(fixed),
      onChangeUrl: () => {
        history.pushState({}, '', `/random-page-${Math.random()}`);
        AdjustSmartBanner.show();
      }
    }).render());

    elements.push(content.render());

    return elements;
  };

  return { render };
}
