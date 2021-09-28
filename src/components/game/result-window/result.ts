import { AnchorComponent } from '../../anchor-component';
import { BaseComponent } from '../../base-component';
import './result.sass';

export class Result extends BaseComponent {
  private readonly window: BaseComponent;

  private readonly text: BaseComponent;

  private readonly back: AnchorComponent;

  constructor(image: string, text: string) {
    super('div', ['result']);
    this.window = new BaseComponent('div', ['result__window'], { background: image });
    this.text = new BaseComponent('div', ['result__text'], { inner: text });
    this.back = new AnchorComponent(['result__button'], { text: 'ok', href: '#/' });

    this.back.element.addEventListener('click', () => this.hideWindow());

    this.window.element.append(this.text.element, this.back.element);
    this.element.append(this.window.element);
  }

  hideWindow():void {
    this.element.remove();
  }
}
