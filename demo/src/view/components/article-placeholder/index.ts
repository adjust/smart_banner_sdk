import { loremIpsum } from 'lorem-ipsum';
import * as styles from './styles.module.scss';

export function ArticlePlaceholder() {
  const random = (min: number, max: number) => min + Math.floor(Math.random() * (max - min));

  const generateText = () => {
    return loremIpsum({ count: random(1, 4), units: 'paragraph', format: 'html' });
  };

  const render = () => {
    const article = document.createElement('article');
    article.className = styles.article;


    article.innerHTML = generateText();
    return article;
  };

  return { render };
}
