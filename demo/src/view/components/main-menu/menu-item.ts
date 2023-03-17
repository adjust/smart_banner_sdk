import { StaticComponent } from "../../base-component";

export interface MenuItemProps {
  label?: string;
  onClick: () => void;
}

export type MenuItemComponent = StaticComponent<MenuItemProps>

export function MenuItem(props: MenuItemProps): MenuItemComponent {
  const render = () => {
    const root = document.createElement('span');
    root.addEventListener('click', props.onClick);

    const label = document.createElement('a');
    label.innerText = props.label ?? '';
    root.append(label);

    return root;
  };

  return { render };
}
