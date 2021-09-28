import thunk from 'redux-thunk';
import {
  createStore, applyMiddleware, combineReducers, composeWithDevTools, RowType, getWordsStatistic, wordsStatistic,
} from './exports';

enum KeyWords{
  TRAINS = 'TRAIN',
  PLAY = 'PLAY',
  TRAIN_MODE = 'TRAIN_MODE',
  PLAY_MODE = 'PLAY_MODE',
  INCREMENT_TRAIN = 'INCREMENT_TRAIN',
  INCREMENT_CORRECT = 'INCREMENT_CORRECT',
  INCREMENT_WRONG = 'INCREMENT_WRONG',
  CLEAR = 'CLEAR',
  TRAIN_COUNT = 'train',
  CORRECT_COUNT = 'correct',
  WRONG_COUNT = 'wrong',
  PERCENT = 'percent',
}

export function resetCount(): { type: string, payload: string } {
  return {
    type: KeyWords.CLEAR,
    payload: '',
  };
}

export function incrementTrainCount(word: string): { type: string, payload: string } {
  return {
    type: KeyWords.INCREMENT_TRAIN,
    payload: word,
  };
}

export function incrementCorrectCount(word: string): { type: string, payload: string } {
  return {
    type: KeyWords.INCREMENT_CORRECT,
    payload: word,
  };
}

export function incrementWrongCount(word: string): { type: string, payload: string } {
  return {
    type: KeyWords.INCREMENT_WRONG,
    payload: word,
  };
}

export function trainView(): { type: string } {
  return {
    type: KeyWords.TRAINS,
  };
}

export function playView(): { type: string } {
  return {
    type: KeyWords.PLAY,
  };
}

export function trainMode(): { type: string } {
  return {
    type: KeyWords.TRAIN_MODE,
  };
}

export function playMode(): { type: string } {
  return {
    type: KeyWords.PLAY_MODE,
  };
}

function calcPercent(state: RowType[], index: number): string {
  const CALC = Math.round((+state[index][KeyWords.WRONG_COUNT] / (+state[index][KeyWords.WRONG_COUNT]
    + +state[index][KeyWords.CORRECT_COUNT])) * 100);
  const percent = Number.isNaN(CALC) ? '0' : String(CALC);
  return percent;
}

function changePercentInTable(store: RowType[], index: number):void {
  const percent = calcPercent(store, index);
  store[index][KeyWords.PERCENT] = percent;
}

function incrementReducer(state = getWordsStatistic(), action =
{ type: KeyWords.INCREMENT_TRAIN, payload: KeyWords.TRAIN_COUNT }): Array<RowType> {
  let index = -1;
  state.forEach((elem, i) => {
    if (elem.word === action.payload) index = i;
  });

  const newState = [...state];

  if (action.type === KeyWords.INCREMENT_TRAIN && index >= 0) {
    newState[index][KeyWords.TRAIN_COUNT] = String(+newState[index][KeyWords.TRAIN_COUNT] + 1);
    return newState;
  } if (action.type === KeyWords.INCREMENT_CORRECT && index >= 0) {
    newState[index][KeyWords.CORRECT_COUNT] = String(+newState[index][KeyWords.CORRECT_COUNT] + 1);
    changePercentInTable(newState, index);
    return newState;
  } if (action.type === KeyWords.INCREMENT_WRONG && index >= 0) {
    newState[index][KeyWords.WRONG_COUNT] = String(+newState[index][KeyWords.WRONG_COUNT] + 1);
    changePercentInTable(newState, index);
    return newState;
  } if (action.type === KeyWords.CLEAR) {
    return wordsStatistic();
  }

  return state;
}

function switchReducer(state = false, action = { type: KeyWords.TRAINS }): boolean {
  if (action.type === KeyWords.TRAINS) {
    return false;
  } if (action.type === KeyWords.PLAY) {
    return true;
  }

  return state;
}

function modeReducer(state = false, action = { type: KeyWords.TRAIN_MODE }): boolean {
  if (action.type === KeyWords.TRAIN_MODE) {
    return false;
  } if (action.type === KeyWords.PLAY_MODE) {
    return true;
  }

  return state;
}

export const rootReducer = combineReducers({
  view: switchReducer,
  mode: modeReducer,
  result: incrementReducer,
});

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

store.dispatch({ type: 'INIT' });

export function dispatchToStore(): void {
  store.dispatch(resetCount());
}
