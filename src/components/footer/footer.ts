import './footer.sass';
import rsscoolLogo from '../../images/rsschool.svg';
import githubLogo from '../../images/github.svg';
import { AnchorComponent } from '../anchor-component';
import { BaseComponent } from '../base-component';

export class Footer extends BaseComponent {
  private readonly footerContainer: BaseComponent;

  private readonly schoolLogo: AnchorComponent;

  private readonly myGithub: AnchorComponent;

  constructor() {
    super('footer', ['footer']);
    this.footerContainer = new BaseComponent('div', ['footer-container']);
    this.schoolLogo = new AnchorComponent(['footer__logo'], {
      href: 'https://rs.school/js/',
      text: `<img src=${rsscoolLogo} alt="school logo" class="footer__logo-image">`,
    });
    this.myGithub = new AnchorComponent(['footer__github'], {
      href: 'https://github.com/inqui05',
      text: `<img src=${githubLogo} alt="github logo" class="footer__github-icon">
             <span class="footer__github-account">inqui05</span>`,
    });
    this.footerContainer.element.append(...[this.schoolLogo.element, this.myGithub.element]);
    this.element.append(this.footerContainer.element);
  }
}
