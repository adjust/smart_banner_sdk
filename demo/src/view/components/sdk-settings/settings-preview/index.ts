import { Component } from "demo/src/view/base-component";
import styles from './settings-preview.module.scss';

export interface SettingsPreviewProps {
  innerCode: string;
}

export function SettingsPreview(props: SettingsPreviewProps): Component<SettingsPreviewProps> {
  let preview: HTMLElement;

  const render = () => {
    preview = document.createElement('pre');
    preview.className = 'flex-one ' + styles.code;
    preview.innerText = props.innerCode;
    return preview;
  };

  const update = (newProps: SettingsPreviewProps) => {
    preview.innerHTML = newProps.innerCode;
  }

  return {
    render,
    update
  };
}
