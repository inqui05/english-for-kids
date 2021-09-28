import './categoryWrapper.sass';
import { BaseComponent, cards, Category } from './exports';

export class CategoryWrapper extends BaseComponent {
  constructor() {
    super('div', ['category-wrapper']);
  }

  addCategory():void {
    this.element.innerHTML = '';
    const categoryCount = cards[0].length;

    for (let i = 0; i < categoryCount; i++) {
      const name = cards[0][i] as string;
      const firstElem = cards[i + 2][0] as Record<string, string>;
      const path = `${firstElem.image}`;
      const link = cards[1][i] as string;

      this.element.append(new Category(name, path, link).element);
    }
  }
}
