import { Component, OnDestroy, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { AsyncPipe, CurrencyPipe, LocationStrategy, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { CheckoutComponent } from '../../components/pages/cart/checkout/checkout.component';
import { SelectGroupComponent } from '../../components/pages/cart/select-group/select-group.component';


@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [CheckoutComponent, NgIf, AsyncPipe, SelectGroupComponent],
  template: `
    <app-select-group-component></app-select-group-component>
  `,
})
export default class CartPageComponent {
  // groupIndex$!: Observable<number|null>;
  constructor(
    private cartService: CartService,
    private router: Router,
  ) {
    // this.groupIndex$ = this.cartService.groupIndex$;

  }
}
