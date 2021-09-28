import './header.sass';
import openMenu from '../../images/menu.svg';
import closeMenu from '../../images/close.svg';
import {
  BaseComponent, ImageComponent, MenuItem, ButtonComponent, InputComponent, playView, store, trainView,
} from './exports';

export class Header extends BaseComponent {
  private readonly headerWrapper: BaseComponent;

  private readonly menu: BaseComponent;

  private readonly menuButton: ImageComponent;

  private readonly menuWrapper: BaseComponent;

  private readonly menuList: BaseComponent;

  private readonly mainPageLink: MenuItem;

  private readonly actionALink: MenuItem;

  private readonly actionBLink: MenuItem;

  private readonly animalALink: MenuItem;

  private readonly animalBLink: MenuItem;

  private readonly clothesLink: MenuItem;

  private readonly emotionsLink: MenuItem;

  private readonly smthALink: MenuItem;

  private readonly smthBLink: MenuItem;

  private readonly statsLink: MenuItem;

  private readonly login: ButtonComponent;

  private readonly menuCloser: BaseComponent;

  private readonly closeImage: ImageComponent;

  private readonly title: BaseComponent;

  private readonly switchContainer: BaseComponent;

  private readonly switcher: InputComponent;

  constructor() {
    super('header', ['header']);
    this.headerWrapper = new BaseComponent('div', ['header__wrapper']);
    this.menu = new BaseComponent('div', ['menu']);
    this.menuButton = new ImageComponent(['menu__image'], { alt: 'menu', src: openMenu });
    this.menuWrapper = new BaseComponent('nav', ['menu__wrapper']);
    this.menuList = new BaseComponent('ul', ['menu__list']);
    this.mainPageLink = new MenuItem({ href: '#/', text: 'Main page' });
    this.actionALink = new MenuItem({ href: '#/action-a', text: 'Action (set A)' });
    this.actionBLink = new MenuItem({ href: '#/action-b', text: 'Action (set B)' });
    this.animalALink = new MenuItem({ href: '#/animal-a', text: 'Animal (set A)' });
    this.animalBLink = new MenuItem({ href: '#/animal-b', text: 'Animal (set B)' });
    this.clothesLink = new MenuItem({ href: '#/clothes', text: 'Clothes' });
    this.emotionsLink = new MenuItem({ href: '#/emotions', text: 'Emotions' });
    this.smthALink = new MenuItem({ href: '#/fruit', text: 'Fruit' });
    this.smthBLink = new MenuItem({ href: '#/berries', text: 'Berries' });
    this.statsLink = new MenuItem({ href: '#/stat', text: 'Statistics' });
    this.login = new ButtonComponent(['menu__button'], { name: 'login', disabled: 'false' });
    this.menuCloser = new BaseComponent('div', ['menu__close']);
    this.closeImage = new ImageComponent(['close'], { alt: 'close menu', src: closeMenu });
    this.title = new BaseComponent('h1', ['title'], { inner: 'English for kids' });
    this.switchContainer = new BaseComponent('div', ['switch']);
    this.switcher = new InputComponent(['switch__input'], { type: 'checkbox' });

    this.menuButton.element.addEventListener('click', () => this.showMenu());
    window.addEventListener('click', (event) => this.hideMenu(event));
    this.menuList.element.addEventListener('click', (event) => this.closeMenu(event));
    this.switcher.element.addEventListener('input', () => this.changeState());
    this.menuList.element.addEventListener('click', (event) => this.highlightSelectedItem(event));

    this.menuList.element.append(...[this.mainPageLink.element, this.actionALink.element,
      this.actionBLink.element, this.animalALink.element, this.animalBLink.element,
      this.clothesLink.element, this.emotionsLink.element, this.smthALink.element,
      this.smthBLink.element, this.statsLink.element]);
    this.menuCloser.element.append(this.closeImage.element);
    this.switchContainer.element.append(this.switcher.element);
    this.menuWrapper.element.append(this.menuList.element, this.login.element, this.menuCloser.element);
    this.menu.element.append(this.menuButton.element, this.menuWrapper.element);
    this.headerWrapper.element.append(this.menu.element, this.title.element, this.switchContainer.element);
    this.element.append(this.headerWrapper.element);

    store.subscribe(() => {
      const state = store.getState();

      if (state.mode) {
        this.switcher.element.disabled = true;
      } else {
        this.switcher.element.disabled = false;
      }
    });
  }

  highlightSelectedItem(event:Event):void {
    const target = event.target as HTMLElement;
    const menuItems = [this.mainPageLink, this.actionALink, this.actionBLink, this.animalALink, this.animalBLink,
      this.clothesLink, this.emotionsLink, this.smthALink, this.smthBLink, this.statsLink];

    if (target.closest('.menu__item')) {
      menuItems.forEach((elem) => elem.removeHighlight());
      target.classList.add('menu__link_active');
    }
  }

  changeState():void {
    const action = this.switcher.element.checked ? playView() : trainView();
    store.dispatch(action);
  }

  showMenu():void {
    this.menuWrapper.element.classList.add('menu__open');
  }

  closeMenu(event: Event):void {
    const target = event.target as HTMLElement;
    if (target.closest('.menu__item')) this.menuWrapper.element.classList.remove('menu__open');
  }

  hideMenu(event: Event):void {
    const target = event.target as HTMLElement;
    const isMenuClosed = !this.menuWrapper.element.classList.contains('menu__open');
    const isMenuOpening = target.classList.contains('menu__image');
    const isTargetMenu = target.closest('.menu__wrapper');
    const isTargetCloseMenu = target.classList.contains('close');

    if (!isMenuClosed && !isMenuOpening && (isTargetCloseMenu || !isTargetMenu)) {
      this.menuWrapper.element.classList.remove('menu__open');
    }
  }
}
