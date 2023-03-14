import styles from './settings-preview.module.scss';

export interface SettingsPreviewProps {
  innerCode: string;
}

export function SettingsPreview(props: SettingsPreviewProps) {
  const render = () => {
    const preview = document.createElement('pre');
    preview.className = 'flex-one';
    preview.innerText = props.innerCode;
    return preview;
  };

  return { render };
}
