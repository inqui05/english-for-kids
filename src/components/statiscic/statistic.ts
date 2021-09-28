import './statistic.sass';
import {
  BaseComponent, TableRow, ButtonComponent, dispatchToStore, store, RowType, AnchorComponent,
  COLUMNS, sortData, LOCAL_STORAGE_NAME, removeStyles,
} from './exports';

const PERCENT = 'wrong, %';
const CellData: RowType = {
  category: 'Category&nbsp;<p class="arrow">&uarr;</p>',
  word: 'Word&nbsp;<p class="arrow">&uarr;</p>',
  translation: 'Translation&nbsp;<p class="arrow">&uarr;</p>',
  train: 'Train&nbsp;<p class="arrow">&uarr;</p>',
  correct: 'Correct&nbsp;<p class="arrow">&uarr;</p>',
  wrong: 'Wrong&nbsp;<p class="arrow">&uarr;</p>',
  percent: 'Wrong, %&nbsp;<p class="arrow">&uarr;</p>',
};

enum Buttons {
  reset = 'reset',
  train = 'train difficult words',
}

export class Statistic extends BaseComponent {
  private readonly table: BaseComponent;

  private readonly headCell: TableRow;

  private readonly buttons: BaseComponent;

  private readonly trainButton: AnchorComponent;

  private readonly resetButton: ButtonComponent;

  private rows: TableRow[] = [];

  constructor() {
    super('div', ['scope']);
    this.table = new BaseComponent('table', ['words']);
    this.headCell = new TableRow(['words__head'], ['words__cell', 'words__head-cell', 'arrow__hidden'], CellData);
    this.buttons = new BaseComponent('div', ['scope__buttons']);
    this.trainButton = new AnchorComponent(['scope__train'], { href: '#/hard', text: Buttons.train });
    this.resetButton = new ButtonComponent(['scope__reset'], { name: Buttons.reset });

    this.resetButton.element.addEventListener('click', () => dispatchToStore());
    this.headCell.element.addEventListener('click', (event) => this.sortColumns(event));

    this.table.element.append(this.headCell.element);
    this.buttons.element.append(this.trainButton.element, this.resetButton.element);
    this.element.append(this.buttons.element, this.table.element);

    store.subscribe(() => {
      const state = store.getState().result;

      localStorage[LOCAL_STORAGE_NAME] = JSON.stringify(state);
      this.changeDataInTable(state);
    });
    this.addDataToTable();
  }

  sortColumns(event:Event):void {
    const target = event.target as HTMLElement;

    let newData: RowType[] = [];
    const cells = this.headCell.getCells();
    const innerText = target.innerHTML.split('&')[0].toLowerCase();
    const text = innerText === PERCENT ? COLUMNS.PERCENT : innerText;
    const state = store.getState().result;

    if (target.classList.contains('arrow__hidden') || target.classList.contains('arrow__inverse')) {
      removeStyles(cells);
      target.classList.remove('arrow__hidden');

      newData = sortData(state, text);
    } else if (!target.classList.contains('arrow__hidden') && !target.classList.contains('arrow__inverse')) {
      removeStyles(cells);
      target.classList.remove('arrow__hidden');
      target.classList.add('arrow__inverse');

      newData = sortData(state, text).reverse();
    }

    this.changeDataInTable(newData);
  }

  changeDataInTable(data: RowType[]):void {
    this.rows.forEach((elem, index) => {
      if (data[index]) {
        elem.setNewData(data[index]);
      }
    });
  }

  addDataToTable():void {
    const data = store.getState().result;

    data.forEach((elem) => {
      const newRow = new TableRow(['words__head'], ['words__cell', 'words__head-cell'], elem);

      this.rows.push(newRow);
      this.table.element.append(newRow.element);
    });
  }
}
