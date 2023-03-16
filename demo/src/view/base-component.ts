export interface Component<TProps> {
  render: () => HTMLElement;
  update: (props: TProps) => void;
}

export abstract class StaticComponent<TProps> implements Component<TProps> {
  abstract render: () => HTMLElement;
  public update(props: TProps) { };
}
