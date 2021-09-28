export class ButtonComponent {
  readonly element: HTMLButtonElement;

  constructor(styles: string[] = [], params: Record<string, string>) {
    this.element = document.createElement('button');
    this.element.classList.add(...styles);
    if (params.name) this.element.innerHTML = params.name;
    this.element.disabled = params.disabled === 'true';
  }
}
