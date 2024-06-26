import { App } from './view/app';
import { CustomFonts_SmallBanner } from './view/components/visual-tests';
import 'assets/styles.module.scss';

let appRoot = document.getElementById('app_root');

if (!appRoot) {
  console.warn('No app_root found, creating a div with id="app_root"');
  appRoot = document.createElement('app_root');
  document.body.appendChild(appRoot);
}

App().render(appRoot);
// CustomFonts_SmallBanner().render(appRoot)
