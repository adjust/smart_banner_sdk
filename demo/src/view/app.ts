import { Header } from './components/header';
import { Content } from './components/content';

export function App() {
  const render = () => {
    const elements: HTMLElement[] = [];

    const content = Content({ fixedHeader: true });

    elements.push(Header({
      fixed: true,
      onHeaderModeChanged: (fixed: boolean) => content.setHeaderMode(fixed)
    }).render());

    elements.push(content.render());

    return elements;
  };

  return { render };
}
