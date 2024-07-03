import { Component } from '@angular/core';
import { FAQData } from '../../../../../DATA';

@Component({
  selector: 'app-home-faq',
  templateUrl: './faq.component.html',
  standalone: true,
  styles: [
    `
      .faq {
        overflow-x: hidden !important;
      }
      // .faq-question {
      //   transform: translate(52vw, 0px);
      // }
      // .faq-answer {
      //   transform: translate(-52vw, 0px);
      // }
      // .faq-scrollTrigger-animation {
      //   opacity: 0;
      // }
    `,
  ],
})
export class HomeFaqComponent {
  FAQData = FAQData;
}
