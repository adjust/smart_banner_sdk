import styles from './styles.module.scss';

export class AppIcon {
  private placeholder: HTMLElement;
  private image: HTMLImageElement;

  constructor(
    private iconUrl: string,
    private appName: string, 
  ) {
    this.placeholder = document.createElement('div');
    this.placeholder.className = styles.placeholder;

    this.image = document.createElement('img');
    this.image.className = styles.image;
    this.image.alt = 'Application icon';

    this.image.width = 56;
    this.image.height = 56;
  }

  public render(root: HTMLElement) {
    const appIcon = document.createElement('div');
    appIcon.className = styles['app-icon'];

    appIcon.append(this.placeholder, this.image);

    this.showImage();

    root.appendChild(appIcon);
  }

  public update(iconUrl: string, appName: string) {
    if (!this.needUpdate({ iconUrl, appName })) {
      return;
    }

    this.iconUrl = iconUrl;
    this.appName = appName;

    this.showImage();
  }

  private needUpdate(nextData: { iconUrl: string, appName: string }) {
    return this.iconUrl !== nextData.iconUrl
      || this.appName !== nextData.appName;
  }

  private showImage(): Promise<void> {
    return this.loadImage(this.iconUrl, this.image)
      .then(() => {
        this.image.style.display = '';
        this.placeholder.style.display = 'none';
      })
      .catch(() => {
        this.image.style.display = 'none';
        this.placeholder.style.display = '';

        this.placeholder.innerText = this.appName.length ? this.appName[0].toUpperCase() : '';
      });
  }

  private loadImage(url: string, image: HTMLImageElement): Promise<unknown> {
    return new Promise((resolve, reject) => {
      image.onload = resolve;
      image.onerror = reject;
      image.src = url;
    });
  }
}
