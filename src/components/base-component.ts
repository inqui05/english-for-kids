export class BaseComponent {
  readonly element: HTMLElement;

  constructor(tag: keyof HTMLElementTagNameMap = 'div', styles: string[] = [], params:
  Record<string, string> = { inner: '', background: '' }) {
    this.element = document.createElement(tag);
    this.element.classList.add(...styles);
    if (params.inner) this.element.innerHTML = params.inner;
    if (params.background) this.element.style.backgroundImage = `url(${params.background})`;
  }
}
