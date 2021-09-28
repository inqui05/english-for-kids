import './styles.sass';
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';
import { CategoryWrapper } from './components/category/categoryWrapper';
import { Game } from './components/game/game';
import { Statistic } from './components/statiscic/statistic';

enum CategoryNames {
  actionA = 'Action (set A)',
  actionB = 'Action (set B)',
  animalA = 'Animal (set A)',
  animalB = 'Animal (set B)',
  clothes = 'Clothes',
  emotions = 'Emotions',
  fruit = 'Fruit',
  berries = 'Berries',
}

export class App {
  private readonly header: Header;

  private readonly footer: Footer;

  private readonly categories: CategoryWrapper;

  private readonly game: Game;

  private readonly statistic: Statistic;

  constructor(private readonly root: Element) {
    this.header = new Header();
    this.footer = new Footer();
    this.categories = new CategoryWrapper();
    this.game = new Game();
    this.statistic = new Statistic();

    this.root.before(this.header.element);
    this.root.after(this.footer.element);
  }

  start():void {
    this.root.append(this.categories.element);
    this.categories.addCategory();
  }

  render(location: string): void {
    switch (location) {
      case '':
      case '#/':
        this.renderSelectedContent(this.categories.element);
        this.categories.addCategory();
        break;
      case '#/action-a':
        this.renderSelectedContent(this.game.element, CategoryNames.actionA);
        break;
      case '#/action-b':
        this.renderSelectedContent(this.game.element, CategoryNames.actionB);
        break;
      case '#/animal-a':
        this.renderSelectedContent(this.game.element, CategoryNames.animalA);
        break;
      case '#/animal-b':
        this.renderSelectedContent(this.game.element, CategoryNames.animalB);
        break;
      case '#/clothes':
        this.renderSelectedContent(this.game.element, CategoryNames.clothes);
        break;
      case '#/emotions':
        this.renderSelectedContent(this.game.element, CategoryNames.emotions);
        break;
      case '#/fruit':
        this.renderSelectedContent(this.game.element, CategoryNames.fruit);
        break;
      case '#/berries':
        this.renderSelectedContent(this.game.element, CategoryNames.berries);
        break;
      case '#/hard':
        this.renderSelectedContent(this.game.element);
        this.game.addDifficultCardToField();
        break;
      case '#/stat':
        this.renderSelectedContent(this.statistic.element);
        break;
      default:
        break;
    }
  }

  renderSelectedContent(element: HTMLElement, categoryName = ''):void {
    this.root.innerHTML = '';
    this.root.append(element);
    if (categoryName) this.game.addCardToField(categoryName);
    this.game.clearPlaySettings();
  }
}
