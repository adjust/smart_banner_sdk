import styles from './styles.module.scss';

export function MainMenu() {
  const render = () => {
    const menu = document.createElement('div');
    menu.id = 'drawer';
    menu.className = `${styles.drawer}`;

    return menu;
  };

  return { render };
}
