import { Header } from './components/header';
import { Content } from './components/content';

export function App() {
  const fixedHeader = false;

  const render = () => {
    const elements: HTMLElement[] = [];

    const content = Content({ fixedHeader });

    elements.push(Header({
      fixed: fixedHeader,
      onHeaderModeChanged: (fixed: boolean) => content.setHeaderMode(fixed)
    }).render());

    elements.push(content.render());

    return elements;
  };

  return { render };
}
