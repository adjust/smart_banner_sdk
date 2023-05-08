import { Button } from '../button';
import { MainMenu, MenuItem } from '../main-menu';
import styles from './styles.module.scss';

export interface HeaderProps {
  fixed: boolean;
}

export function Header(props: HeaderProps) {
  let header: HTMLElement;
  let headerLabel: HTMLElement;
  let fixed = props.fixed;

  const render = () => {
    header = document.createElement('div');

    const mainMenu = createMenu();

    header.appendChild(
      Button({
        label: 'Menu',
        onClick: () => { mainMenu.open(); }
      }).render()
    );

    headerLabel = document.createElement('h1');
    headerLabel.innerHTML = `I am a ${props.fixed ? 'Fixed ' : ''}Header`;
    header.appendChild(headerLabel);

    if (props.fixed) {
      makeHeaderFixed();
    } else {
      makeHeaderFloat();
    }

    return header;
  };

  const makeHeaderFixed = () => {
    header.className = `${styles.header} ${styles.fixed}`;
    headerLabel.innerHTML = 'I am a Fixed Header';
  };

  const makeHeaderFloat = () => {
    header.className = styles.header;
    headerLabel.innerHTML = 'I am a Header';
  };

  const createMenu = () => {
    const fixedHeaderMenuItem = MenuItem({
      label: 'Fixed header',
      onClick: () => {
        fixed = !fixed;
        if (fixed) {
          makeHeaderFixed();
        } else {
          makeHeaderFloat();
        }
      }
    });

    const mainMenu = MainMenu({ menuItems: [fixedHeaderMenuItem] });
    const renderred = mainMenu.render();
    header.appendChild(renderred);

    return mainMenu;
  };

  return { render };
}
