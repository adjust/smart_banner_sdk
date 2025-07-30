import { ArticlePlaceholder } from '../article-placeholder';
import { SdkSettings } from '../sdk-settings';
import * as styles from './styles.module.scss';

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

    renderBannerRoot();

    root.appendChild(SdkSettings().render());

    for (let i = 0; i < 3; i++) {
      root.appendChild(ArticlePlaceholder().render());
    }

    return root;
  };

  const renderBannerRoot = () => {
    const smartBannerRoot = document.createElement('div');
    smartBannerRoot.id = 'smart-banner-parent';
    smartBannerRoot.className = styles['smart-banner-parent'];
    smartBannerRoot.append('#smart-banner-parent');
    root.appendChild(smartBannerRoot);
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
