import {
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  Component,
  Inject,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  inject,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenubarComponent } from './components/header/menubar/menubar.component';
import { HomeFooterComponent } from './components/footer/footer.component';
import { cartEffects } from './store/cart/effects';
import { CartService } from './services/cart.service';
import gsap from 'gsap';

import ScrollTrigger from 'gsap/dist/ScrollTrigger';

import { AuthService } from './services/auth.service';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MenubarComponent, HomeFooterComponent],
  template: `
    <div id="smooth-content">
      <app-menubar>
        <router-outlet></router-outlet>
        <app-home-footer></app-home-footer>
      </app-menubar>
    </div>
  `,
})
export class AppComponent implements OnDestroy, OnInit, AfterViewInit {
  private _platformId = inject(PLATFORM_ID);

  constructor(
    private cartService: CartService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this._platformId)) {
      this.authService.loadToken();
  }
  
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this._platformId)) {
      gsap.registerPlugin(ScrollTrigger);

      // console.log(LocomotiveScroll, 'LocomotiveScroll');
  

      // this.smoother = ScrollSmoother.create({
      //   content: '#smooth-content',
      //   wrapper: 'my-app',
      //   smooth: 2,
      // });

      gsap.to('.faq-scrollTrigger-animation', {
        x: '0',
        duration: 1,
        opacity: 1,
        scrollTrigger: {
          trigger: '.faq-scrollTrigger-animation',
          start: 'top 100%',
          end: 'top 10%',
          scrub: true,
        },
      });
    }
  }
  ngOnDestroy(): void {}
}
