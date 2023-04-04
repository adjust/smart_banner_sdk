import styles from './styles.module.scss';

export class ActionButton {
  private link: HTMLAnchorElement;

  constructor(private buttonLabel: string, private href: string) {
    this.link = document.createElement('a');
  }

  // TODO: set colors from data
  public render(root: HTMLElement) {
    this.link.className = styles.action;
    this.link.innerText = this.buttonLabel;
    this.link.href = this.href;

    root.appendChild(this.link);
  }
}
