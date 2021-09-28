import { RowType } from '../../../shared/initialTableState';
import { BaseComponent } from '../../base-component';

export class TableRow extends BaseComponent {
  private readonly category: BaseComponent;

  private readonly word: BaseComponent;

  private readonly translation: BaseComponent;

  private readonly train: BaseComponent;

  private readonly correct: BaseComponent;

  private readonly wrong: BaseComponent;

  private readonly percent: BaseComponent;

  constructor(rowStyles: string[] = ['words__record'],
    cellStyles: string[] = ['words__cell'], params: RowType) {
    super('tr', rowStyles);
    this.category = new BaseComponent('td', cellStyles, { inner: params.category });
    this.word = new BaseComponent('td', cellStyles, { inner: params.word });
    this.translation = new BaseComponent('td', cellStyles, { inner: params.translation });
    this.train = new BaseComponent('td', cellStyles, { inner: params.train });
    this.correct = new BaseComponent('td', cellStyles, { inner: params.correct });
    this.wrong = new BaseComponent('td', cellStyles, { inner: params.wrong });
    this.percent = new BaseComponent('td', cellStyles, { inner: params.percent });

    this.element.append(this.category.element, this.word.element, this.translation.element, this.train.element,
      this.correct.element, this.wrong.element, this.percent.element);
  }

  setNewData(data: RowType):void {
    this.category.element.innerHTML = data.category;
    this.word.element.innerHTML = data.word;
    this.translation.element.innerHTML = data.translation;
    this.train.element.innerHTML = data.train;
    this.correct.element.innerHTML = data.correct;
    this.wrong.element.innerHTML = data.wrong;
    this.percent.element.innerHTML = data.percent;
  }

  getCells():Array<BaseComponent> {
    return [this.category, this.word, this.translation, this.train, this.correct, this.wrong, this.percent];
  }
}
