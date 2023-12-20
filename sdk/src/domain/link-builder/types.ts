export interface LinkBuilder<T> {
  build(linkData: T, pageUrl: string): string;
}
