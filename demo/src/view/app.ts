import { Header } from './components/header';
import { Content } from './components/content';

export function App() {
  const render = () => {
    const elements: HTMLElement[] = [];

    elements.push(Header().render());
    elements.push(Content().render());

    return elements;
  };

  return { render };
}
