import { MenuIconButton } from '../button';
import styles from './styles.module.scss';

export function Header(fixed = true) {
  const classNames = () => {
    const names = [styles.header];

    if (fixed) {
      names.push(styles.fixed);
    }

    return names.join(' ');
  };

  const render = () => {
    const header = document.createElement('div');
    header.className = classNames();

    const menuButton = MenuIconButton({ label: 'Menu', clickHandler: () => { console.log('Menu clicked'); } }).render();
    header.appendChild(menuButton);

    const text = document.createElement('h1');
    text.innerHTML = `I am a ${fixed ? 'Fixed' : ''} Header`;
    header.appendChild(text);

    return header;
  };

  return { render };
}
