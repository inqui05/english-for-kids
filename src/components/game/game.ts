import './game.sass';
import success from '../../images/success.jpg';
import failure from '../../images/failure.jpg';
import {
  EmptyStar, FullStar, BaseComponent, ButtonComponent, AudioComponent, Card, cards, Result, collectDifficultWords,
  returnString, shuffleArray, incrementCorrectCount, incrementWrongCount, playMode, store, trainMode,
} from './exports';

export class Game extends BaseComponent {
  private readonly gameControl: BaseComponent;

  private readonly buttons: BaseComponent;

  private readonly start: ButtonComponent;

  private readonly repeat: ButtonComponent;

  private readonly starsWrapper: BaseComponent;

  private readonly cards: BaseComponent;

  private readonly correct: AudioComponent;

  private readonly error: AudioComponent;

  private readonly success: AudioComponent;

  private readonly failure: AudioComponent;

  private activeCards: Card[];

  private gamingCards: Card[] | null;

  private currentCard: Card | null;

  private mistakes = 0;

  constructor() {
    super('div', ['game']);
    this.gameControl = new BaseComponent('div', ['game-control', 'hidden']);
    this.buttons = new BaseComponent('div', ['game-control__buttons']);
    this.start = new ButtonComponent(['game-control__start'], { inner: '', disabled: 'false' });
    this.repeat = new ButtonComponent(['game-control__repeat'], { inner: '', disabled: 'true' });
    this.starsWrapper = new BaseComponent('div', ['game-control__stars']);
    this.cards = new BaseComponent('div', ['cards']);
    this.correct = new AudioComponent('./audio/correct.mp3');
    this.error = new AudioComponent('./audio/error.mp3');
    this.success = new AudioComponent('./audio/success.mp3');
    this.failure = new AudioComponent('./audio/failure.mp3');
    this.activeCards = [];
    this.gamingCards = null;
    this.currentCard = null;

    this.start.element.addEventListener('click', () => this.initGameData());
    this.repeat.element.addEventListener('click', () => this.repeatSound());

    this.buttons.element.append(this.start.element, this.repeat.element);
    this.gameControl.element.append(this.buttons.element, this.starsWrapper.element);
    this.element.append(this.gameControl.element, this.cards.element);

    store.subscribe(() => {
      const state = store.getState();

      if (state.view) {
        this.showGameControlInterface();
      } else {
        this.hideGameControlInterface();
      }
    });
  }

  initGameData():void {
    this.gamingCards = shuffleArray(this.activeCards);
    this.setNewActiveCard();
    if (this.gamingCards) {
      this.gamingCards.forEach((elem) => elem.element.addEventListener('click', () => this.playGame(elem)));
    }
    this.blockedControlElementsOnPlayMode();
  }

  playGame(card: Card):void {
    if (this.currentCard === card) {
      this.correctAnswer(card);
      if (this.gamingCards && this.gamingCards.length > 1) {
        this.gamingCards.splice(0, 1);
        this.setNewActiveCard();
        card.element.classList.add('blocked');
      } else if (this.gamingCards && this.gamingCards.length === 1) {
        card.element.classList.add('blocked');
        this.gamingCards = null;
        this.currentCard = null;
        this.finishGame();
      }
    } else {
      this.mistakes++;
      this.wrongAnswer(card);
    }
  }

  setNewActiveCard():void {
    if (this.gamingCards) {
      const linksToCards = this.gamingCards;
      this.gamingCards.forEach((elem) => elem.element.classList.add('wait'));
      [this.currentCard] = this.gamingCards;

      setTimeout(() => {
        if (this.currentCard) this.currentCard.repeatPronunciation();
        linksToCards.forEach((elem) => elem.element.classList.remove('wait'));
      }, 500);
    }
  }

  addCardToField(categoryName: string):void {
    this.prepareAppToAddCards();
    const categoriesNames = cards[0] as Array<string>;
    const index = categoriesNames.indexOf(categoryName) + 2;
    const countElements = cards[index].length;

    for (let i = 0; i < countElements; i++) {
      const cardData = cards[index][i] as Record<string, string>;
      const card = new Card(cardData.image, cardData.word, cardData.translation, cardData.audioSrc);

      this.addCard(card);
    }
  }

  addDifficultCardToField(): void {
    this.prepareAppToAddCards();
    const categoriesNames = cards[0] as Array<string>;
    const cardsData = collectDifficultWords();

    cardsData.forEach((elem) => {
      const index = categoriesNames.indexOf(elem.category) + 2;
      const categoriesWords = cards[index] as Array<Record<string, string>>;
      categoriesWords.forEach((item) => {
        if (elem.word === item.word) {
          const card = new Card(item.image, item.word, item.translation, item.audioSrc);

          this.addCard(card);
        }
      });
    });
  }

  addCard(card: Card):void {
    this.activeCards.push(card);
    this.cards.element.append(card.element);
  }

  prepareAppToAddCards():void {
    this.activeCards = [];
    this.cards.element.innerHTML = '';
  }

  finishGame():void {
    let result: Result;
    if (!this.mistakes) {
      result = new Result(success, returnString(this.mistakes));
      this.success.element.play();
    } else {
      result = new Result(failure, returnString(this.mistakes));
      this.failure.element.play();
    }

    this.element.append(result.element);
    this.clearPlaySettings();
  }

  clearPlaySettings():void {
    this.starsWrapper.element.innerHTML = '';
    this.mistakes = 0;

    this.unblockedControlElementsOnTrainMode();
  }

  hideGameControlInterface():void {
    this.gameControl.element.classList.add('hidden');
  }

  showGameControlInterface(): void {
    this.gameControl.element.classList.remove('hidden');
  }

  correctAnswer(card: Card):void {
    const star = new FullStar();
    this.starsWrapper.element.append(star.element);
    this.correct.element.play();

    store.dispatch(incrementCorrectCount(card.getWordFromCard()));
  }

  wrongAnswer(card: Card):void {
    const star = new EmptyStar();
    this.starsWrapper.element.append(star.element);
    this.error.element.play();

    store.dispatch(incrementWrongCount(card.getWordFromCard()));
  }

  repeatSound():void {
    if (this.currentCard) this.currentCard.repeatPronunciation();
  }

  blockedControlElementsOnPlayMode():void {
    this.start.element.disabled = true;
    this.repeat.element.disabled = false;

    store.dispatch(playMode());
  }

  unblockedControlElementsOnTrainMode():void {
    this.start.element.disabled = false;
    this.repeat.element.disabled = true;

    store.dispatch(trainMode());
  }
}
