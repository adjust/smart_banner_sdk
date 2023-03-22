import { ArticlePlaceholder } from '../article-placeholder';
import { SdkSettings } from '../sdk-settings';
import styles from './styles.module.scss';

export interface ContentProps {
  fixedHeader: boolean
}

export function Content(props: ContentProps = {
  fixedHeader: true
}) {
  let root: HTMLElement;

  const render = () => {
    root = document.createElement('div');
    setHeaderMode(props.fixedHeader);

    root.appendChild(SdkSettings().render());

    for (let i = 0; i < 3; i++) {
      root.appendChild(ArticlePlaceholder().render());
    }

    return root;
  };

  const setHeaderMode = (fixed: boolean) => {
    if (fixed) {
      root.className = `${styles.content} ${styles['fixed-header']}`;
    } else {
      root.className = styles.content;
    }
  };

  return { render, setHeaderMode };
}
