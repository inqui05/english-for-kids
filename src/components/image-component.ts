export class ImageComponent {
  readonly element: HTMLImageElement;

  constructor(styles: string[] = [], params: Record<string, string> = { inner: '' }) {
    this.element = new Image();
    this.element.classList.add(...styles);
    this.element.alt = params.alt;
    this.element.src = params.src;
  }
}
