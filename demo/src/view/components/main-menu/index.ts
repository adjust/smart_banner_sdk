import { MenuItem, MenuItemComponent, MenuItemProps } from './menu-item';
import { CloseIconButton } from '../button';
import * as styles from './styles.module.scss';

export interface MenuProps {
  menuItems: MenuItemComponent[];
}

export function MainMenu(props: MenuProps) {
  let root: HTMLElement;
  let menu: HTMLElement;

  const render = () => {
    root = document.createElement('div');
    root.addEventListener('click', close);

    menu = document.createElement('div');
    menu.className = styles['main-menu'];

    const menuHeader = document.createElement('div');
    menuHeader.className = styles['menu-header'];
    menuHeader.innerHTML = '<span>Menu</span>';

    menuHeader.appendChild(CloseIconButton({
      onClick: close,
      iconSize: '16px'
    }).render());

    menu.append(menuHeader);

    for (const it of props.menuItems) {
      menu.appendChild(it.render());
    }

    root.append(menu);

    return root;
  };

  const open = () => {
    root.className = styles.overlay;
    menu.className = `${styles['main-menu']} ${styles['opened']}`;
  };

  const close = () => {
    root.className = '';
    menu.className = `${styles['main-menu']}`;
  };

  return { render, open, close };
}

export { MenuItem, MenuItemProps };
