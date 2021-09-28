import './fullStar.sass';
import image from '../../../images/star-win.svg';
import { BaseComponent } from '../../base-component';
import { ImageComponent } from '../../image-component';

export class FullStar extends BaseComponent {
  private readonly image: ImageComponent;

  constructor() {
    super('div', ['game-control__full-star']);
    this.image = new ImageComponent(['game-control__full-star-image'], { alt: 'false', src: image });

    this.element.append(this.image.element);
  }
}
