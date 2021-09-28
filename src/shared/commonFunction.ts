import { BaseComponent } from '../components/base-component';
import { Card } from '../components/game/card/card';
import { RowType } from './initialTableState';
import { store } from './redux';

const MAX_COUNT_CARD_IN_PAGE = 8;
export enum COLUMNS {
  CATEGORY = 'category',
  WORD = 'word',
  TRANSLATION = 'translation',
  TRAIN = 'train',
  CORRECT = 'correct',
  WRONG = 'wrong',
  PERCENT = 'percent',
}

export const shuffleArray = (arr: Card[]): Array<Card> => arr.splice(0).sort(() => Math.random() - 0.5);

export const returnString = (result: number):string => {
  if (!result) return 'you have not made any mistakes!';
  if (result === 1) return `you've made ${result} mistake!`;
  return `you've made ${result} mistakes!`;
};

export const sortData = (arr: RowType[], type: string): RowType[] => {
  for (let i = arr.length - 1; i > 0; i--) {
    for (let j = 0; j < i; j++) {
      if (type === COLUMNS.CATEGORY || type === COLUMNS.WORD || type === COLUMNS.TRANSLATION
        || type === COLUMNS.TRAIN || type === COLUMNS.CORRECT || type === COLUMNS.WRONG || type === COLUMNS.PERCENT) {
        if (arr[j][type] > arr[j + 1][type]) {
          const temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
        }
      }
    }
  }
  return arr;
};

export const collectDifficultWords = (): RowType[] => {
  const difficultWords: RowType[] = [];
  const state = store.getState().result;

  state.forEach((elem) => {
    if (+elem.percent > 25) difficultWords.push(elem);
  });

  return sortData(difficultWords, COLUMNS.PERCENT).slice(0, MAX_COUNT_CARD_IN_PAGE);
};

export function removeStyles(cells: BaseComponent[]):void {
  cells.forEach((elem) => elem.element.classList.add('arrow__hidden'));
  cells.forEach((elem) => elem.element.classList.remove('arrow__inverse'));
}
