import './card.sass';
import audioSrc from '../../../images/audio.svg';
import rotateSrc from '../../../images/rotate.svg';
import {
  BaseComponent, ImageComponent, AudioComponent, incrementTrainCount, store,
} from './exports';

export class Card extends BaseComponent {
  private readonly cardInside: BaseComponent;

  private readonly frontSide: BaseComponent;

  private readonly control: BaseComponent;

  private readonly sound: BaseComponent;

  private readonly soundImage: ImageComponent;

  private readonly word: BaseComponent;

  private readonly rotate: BaseComponent;

  private readonly rotateImage: ImageComponent;

  private readonly backSide: BaseComponent;

  private readonly translate: BaseComponent;

  private readonly ruWord: BaseComponent;

  private readonly pronunciation: AudioComponent;

  constructor(cardImage: string, engWord: string, ruWord: string, soundSrc: string) {
    super('div', ['card-container']);
    this.cardInside = new BaseComponent('div', ['card']);
    this.frontSide = new BaseComponent('div', ['card__front', 'card__image'], { inner: '', background: cardImage });
    if (store.getState().mode) this.control = new BaseComponent('div', ['card__control', 'hidden']);
    else this.control = new BaseComponent('div', ['card__control']);
    this.sound = new BaseComponent('div', ['card__sound']);
    this.soundImage = new ImageComponent(['card__sound-image'], { alt: 'pronounce a sound', src: audioSrc });
    this.word = new BaseComponent('p', ['card__english'], { inner: engWord });
    this.rotate = new BaseComponent('div', ['card__rotate']);
    this.rotateImage = new ImageComponent(['card__rotate-image'], { alt: 'see the translation', src: rotateSrc });
    this.backSide = new BaseComponent('div', ['card__back', 'card__image'], { inner: '', background: cardImage });
    this.translate = new BaseComponent('div', ['card__translate']);
    this.ruWord = new BaseComponent('p', ['card__russian'], { inner: ruWord });
    this.pronunciation = new AudioComponent(soundSrc);

    this.rotate.element.addEventListener('click', () => this.flipCard());
    this.element.addEventListener('mouseleave', () => this.returnCard());
    this.sound.element.addEventListener('click', () => this.playPronunciation());

    this.sound.element.append(this.soundImage.element);
    this.rotate.element.append(this.rotateImage.element);
    this.control.element.append(this.sound.element, this.word.element, this.rotate.element);
    this.frontSide.element.append(this.control.element);
    this.translate.element.append(this.ruWord.element);
    this.backSide.element.append(this.translate.element);
    this.cardInside.element.append(this.frontSide.element, this.backSide.element);
    this.element.append(this.cardInside.element);

    store.subscribe(() => {
      const state = store.getState();

      if (state.view) this.control.element.classList.add('hidden');
      else this.control.element.classList.remove('hidden');
    });
  }

  flipCard():void {
    this.element.classList.add('flipped');

    this.dispatchToStore();
  }

  returnCard(): void {
    this.element.classList.remove('flipped');
  }

  playPronunciation():void {
    this.pronunciation.element.play();

    this.dispatchToStore();
  }

  repeatPronunciation():void {
    this.pronunciation.element.play();
  }

  dispatchToStore():void {
    store.dispatch(incrementTrainCount(this.word.element.innerHTML));
  }

  getWordFromCard():string {
    return this.word.element.innerHTML;
  }
}
