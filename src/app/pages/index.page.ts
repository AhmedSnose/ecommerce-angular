import { Component } from '@angular/core';
import { HomeSwipperComponent } from '../components/swiper/hero/homeSwipper.component';
import { HomeGroupsComponent } from '../components/pages/home/groups/groups.component';
import { HomeProductsComponent } from '../components/pages/home/products/products.component';
import { HomeSellersComponent } from '../components/pages/home/seller/sellers.component';
import { HomeFaqComponent } from '../components/pages/home/FAQ/faq.component';
import { slidersData } from '../../DATA';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HomeSwipperComponent,
    HomeGroupsComponent,
    HomeProductsComponent,
    HomeSellersComponent,
    HomeFaqComponent,
  ],
  template: `
    <app-home-swiper [slidersData]="slidersData" ngSkipHydration></app-home-swiper>
    <app-home-groups></app-home-groups>
    <app-home-products></app-home-products>
    <app-home-sellers></app-home-sellers>
    <app-home-faq></app-home-faq>
  `,
})
export default class HomeComponent {
   slidersData = slidersData
}
