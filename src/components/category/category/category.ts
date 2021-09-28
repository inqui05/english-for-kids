import './category.sass';
import { BaseComponent } from '../../base-component';
import { ImageComponent } from '../../image-component';
import { AnchorComponent } from '../../anchor-component';

export class Category extends AnchorComponent {
  private readonly imageWrapper: BaseComponent;

  private readonly image: ImageComponent;

  private readonly categoryName: BaseComponent;

  constructor(name: string, image: string, link: string) {
    super(['category'], { href: link });
    this.imageWrapper = new BaseComponent('div', ['category__image-wrapper']);
    this.image = new ImageComponent(['category__image'], { alt: name, src: image });
    this.categoryName = new BaseComponent('div', ['category__cover'], { inner: name });

    this.imageWrapper.element.append(this.image.element);
    this.element.append(this.imageWrapper.element, this.categoryName.element);
  }
}
