import { AppToken } from './app-token';
import { DataResidency } from './data-residence';
import { Language } from './language';
import { LogLevel } from './log-level';
import { Context } from './context';
import { SettingsPreview } from './settings-preview';
import { SdkMethods } from './sdk-methods';
import styles from './styles.module.scss';

export function SdkSettings() {
  const render = () => {
    const wrapper = document.createElement('div');
    wrapper.className = styles['sdk-settings'];

    const settings = document.createElement('div');
    settings.className = styles['sdk-settings-wrapper'];

    renderSdkSettingsForm(settings);

    const preview = document.createElement('div');
    preview.className = 'flex-column ' + styles.preview;

    preview.append(
      SettingsPreview({ innerCode: '{key: null}' }).render(),
      SdkMethods({
        onInit: () => console.log('init smart banner'),
        onHide: () => console.log('hide smart banner'),
        onShow: () => console.log('show smart banner')
      }).render()
    );

    wrapper.append(settings, preview);

    return wrapper;
  };

  const renderSdkSettingsForm = (root: HTMLElement) => {
    root.appendChild(AppToken({
      onChange: tokens => console.log(JSON.stringify(tokens))
    }).render());

    root.appendChild(DataResidency({
      onChange: value => console.log(value)
    }).render());

    root.appendChild(Language({
      onChange: value => console.log(value)
    }).render());

    root.appendChild(LogLevel({
      onChange: value => console.log(value)
    }).render());

    root.appendChild(Context({
      onChange: value => console.log(value)
    }).render());
  };

  return { render };
}
