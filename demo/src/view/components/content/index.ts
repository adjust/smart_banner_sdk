import { ArticlePlaceholder } from '../article-placeholder';
import { SdkSettings } from '../sdk-settings';
import styles from './styles.module.scss';

export function Content() {
  const render = () => {
    const content = document.createElement('div');

    content.className = styles.content;

    content.appendChild(SdkSettings().render());

    for (let i = 0; i < 6; i++) {
      const article = ArticlePlaceholder().render();
      content.appendChild(article);
    }

    return content;
  };

  return { render };
}
