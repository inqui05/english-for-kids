export class InputComponent {
  readonly element: HTMLInputElement;

  constructor(styles: string[] = [], params: Record<string, string> = { type: 'text' }) {
    this.element = document.createElement('input');
    this.element.classList.add(...styles);
    this.element.type = params.type;
  }
}
