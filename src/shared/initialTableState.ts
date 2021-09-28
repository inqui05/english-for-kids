import { cards } from '../../public/cards';

const START_CARD_DATA = 2;
export const LOCAL_STORAGE_NAME = 'inqui05-english-for-kids';

export type RowType = {
  category: string,
  word: string,
  translation: string,
  train: string,
  correct: string,
  wrong: string,
  percent: string,
};

export function wordsStatistic(): Array<RowType> {
  const wordsStat: RowType[] = [];
  cards[0].forEach((elem: string | Record<string, string>, index: number) => {
    const categoryData = cards[index + START_CARD_DATA];

    categoryData.forEach((card: string | Record<string, string>) => {
      const word = {} as RowType;

      word.category = elem as string;
      word.word = (card as Record<string, string>).word;
      word.translation = (card as Record<string, string>).translation;
      word.train = '0';
      word.correct = '0';
      word.wrong = '0';
      word.percent = '0';

      wordsStat.push(word);
    });
  });
  return wordsStat;
}

export function getWordsStatistic(): Array<RowType> {
  let data: Array<RowType> = [];
  if (localStorage.getItem(LOCAL_STORAGE_NAME)) {
    const storageData = localStorage.getItem(LOCAL_STORAGE_NAME);
    if (storageData) data = JSON.parse(storageData);
  } else {
    data = wordsStatistic();
  }
  return data;
}
