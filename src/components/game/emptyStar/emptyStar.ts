import './emptyStar.sass';
import image from '../../../images/star.svg';
import { BaseComponent } from '../../base-component';
import { ImageComponent } from '../../image-component';

export class EmptyStar extends BaseComponent {
  private readonly image: ImageComponent;

  constructor() {
    super('div', ['game-control__empty-star']);
    this.image = new ImageComponent(['game-control__empty-star-image'], { alt: 'false', src: image });

    this.element.append(this.image.element);
  }
}
