export class AnchorComponent {
  readonly element: HTMLAnchorElement;

  constructor(styles: string[] = [], params: Record<string, string>) {
    this.element = document.createElement('a');
    this.element.classList.add(...styles);
    if (params.href) this.element.href = params.href;
    if (params.text) this.element.innerHTML = params.text;
  }
}
