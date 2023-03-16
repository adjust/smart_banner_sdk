import { AppToken, DeviceOS } from '@adjustcom/smart-banner-sdk';
import html from './app-token.html';
import styles from './app-token.module.scss';

export interface AppTokenProps {
  value?: AppToken,
  onChange: (tokens: AppToken) => void;
}

export function AppToken(props: AppTokenProps) {
  const platforms = [DeviceOS.Android, DeviceOS.iOS, DeviceOS.WindowsPhone, DeviceOS.WindowsPC];

  const render = () => {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = html;

    selectSpaceTypeHandler(wrapper);
    inputTokenHandler(wrapper);
    createMultipleTokensInput(wrapper);

    return wrapper;
  };

  const selectSpaceTypeHandler = (wrapper: HTMLElement) => {
    const stringTokenWrapper = wrapper.querySelector('#string-token-wrapper') as HTMLElement;
    const multipleTokensWrapper = wrapper.querySelector('#multiple-tokens-wrapper') as HTMLElement;

    const select = wrapper.querySelector('#token-type') as HTMLSelectElement;
    select.addEventListener('change', () => {
      if (select.value === 'multiple-tokens') {
        stringTokenWrapper.className += ' hidden';
        multipleTokensWrapper.className = multipleTokensWrapper.className.replace(' hidden', '');
      } else {
        stringTokenWrapper.className = stringTokenWrapper.className.replace(' hidden', '');
        multipleTokensWrapper.className += ' hidden';
      }
    });
  };

  const inputTokenHandler = (wrapper: HTMLElement) => {
    const input = wrapper.querySelector('#multi-platform-token') as HTMLInputElement;
    input.addEventListener('change', () => props.onChange(input.value));

    if (typeof props.value === 'string') {
      input.value = props.value
    }
  };

  const createMultipleTokensInput = (wrapper: HTMLElement) => {
    const tokensList = wrapper.querySelector('#tokens-list') as HTMLUListElement;
    for (const platform of platforms) {
      const li = document.createElement('li');
      li.className = styles['list-item'];

      const platformName = document.createElement('span');
      platformName.innerText = platform;
      platformName.className = styles['platform-name'];

      const input = document.createElement('input');
      input.type = 'text';
      input.placeholder = `${platform}_app_token`;
      input.className = 'flex-one input-field';

      input.addEventListener('change', () => {
        const appToken: AppToken = {};
        appToken[platform] = input.value;
        props.onChange(appToken);
      });

      li.append(platformName, input);

      tokensList.appendChild(li);
    }
  };

  return { render };
}
