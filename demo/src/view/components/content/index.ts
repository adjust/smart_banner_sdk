import { ArticlePlaceholder } from '../article-placeholder';
import styles from './styles.module.scss';

export function Content() {
  const render = () => {
    const content = document.createElement('div');

    content.className = styles.content;

    for (let i = 0; i < 6; i++) {
      const article = ArticlePlaceholder().render();
      content.appendChild(article);
    }

    return content;
  };

  return { render };
}
