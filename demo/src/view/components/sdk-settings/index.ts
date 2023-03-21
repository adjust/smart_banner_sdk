import { InitialisationOptions } from '@adjustcom/smart-banner-sdk';
import { Observable } from 'demo/src/data/observable';
import { AppToken } from './app-token';
import { DataResidency } from './data-residence';
import { Language } from './language';
import { LogLevel } from './log-level';
import { Context } from './context';
import { SettingsPreview } from './settings-preview';
import { SdkMethods } from './sdk-methods';
import { defaultSdkSettings } from 'demo/src/data/defaultSdkSettings';
import styles from './styles.module.scss';

// TODO it's too 'deep' for this dependency, need to move it somewhere to App level or something like that
import { AdjustSmartBanner } from '@adjustcom/smart-banner-sdk';

export interface SdkSettingsProps {
  sdkSettings?: InitialisationOptions
}

export function SdkSettings(props: SdkSettingsProps = {}) {
  const config = props.sdkSettings ?? defaultSdkSettings;
  const sdkConfig = new Observable(config);

  const render = () => {
    const wrapper = document.createElement('div');
    wrapper.className = styles['sdk-settings'];

    const settings = renderSdkSettingsForm();
    const preview = renderSettingsPreview();

    wrapper.append(settings, preview);

    return wrapper;
  };

  const renderSdkSettingsForm = () => {
    const root = document.createElement('div');
    root.className = styles['sdk-settings-wrapper'];

    const leftColumn = document.createElement('div');
    leftColumn.className = 'flex-one ' + styles['settings-column'];
    const rightColumn = document.createElement('div');
    rightColumn.className = 'flex-one ' + styles['settings-column'];

    leftColumn.appendChild(AppToken({
      value: sdkConfig.value.appToken,
      onChange: tokens => {
        if (typeof tokens === 'string') {
          sdkConfig.value = { ...sdkConfig.value, appToken: tokens };
        } else {
          let oldTokens = sdkConfig.value.appToken;

          if (typeof oldTokens === 'string') {
            oldTokens = {};
          }

          sdkConfig.value = { ...sdkConfig.value, appToken: { ...oldTokens, ...tokens } };
        }
      }
    }).render());

    rightColumn.appendChild(LogLevel({
      value: sdkConfig.value.logLevel,
      onChange: logLevel => sdkConfig.value = { ...sdkConfig.value, logLevel }
    }).render());

    rightColumn.appendChild(DataResidency({
      value: sdkConfig.value.dataResidency,
      onChange: value => sdkConfig.value = { ...sdkConfig.value, dataResidency: value as any }
    }).render());

    rightColumn.appendChild(Language({
      value: sdkConfig.value.language,
      onChange: language => sdkConfig.value = { ...sdkConfig.value, language }
    }).render());

    rightColumn.appendChild(Context({
      onChange: value => console.log(value)
    }).render());

    root.append(leftColumn, rightColumn);

    return root;
  };

  const stringifyExample = () => `AdjustSmartBanner.init(${JSON.stringify(sdkConfig.value, null, 4)})`;

  const renderSettingsPreview = () => {
    const root = document.createElement('div');
    root.className = 'flex-column ' + styles.preview;

    const settingsPreview = SettingsPreview({ innerCode: stringifyExample() });

    sdkConfig.observe(v => settingsPreview.update({ innerCode: stringifyExample() }));

    root.append(
      settingsPreview.render(),
      SdkMethods({
        onInit: () => AdjustSmartBanner.init(sdkConfig.value),
        onHide: () => AdjustSmartBanner.hide(),
        onShow: () => AdjustSmartBanner.show()
      }).render()
    );

    return root;
  };

  return { render };
}
