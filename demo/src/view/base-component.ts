export interface StaticComponent<_TProps> {
  render: () => HTMLElement;
}

export interface Component<TProps> extends StaticComponent<TProps> {
  update: (props: TProps) => void;
}
