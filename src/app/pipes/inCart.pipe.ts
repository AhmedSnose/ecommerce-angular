import { OnDestroy, Pipe, PipeTransform } from '@angular/core';
import { CartService } from '../services/cart.service';
import { Subscription } from 'rxjs';

@Pipe({
  name: 'isInCart',
  standalone: true,
  // pure: false
})
export class IsInCartPipe implements PipeTransform, OnDestroy {
  isProductItemInCart = false;
  subscription!: Subscription;
  constructor(private cartService: CartService) {}

  transform(productItemId: number): string|HTMLButtonElement {
    this.subscription = this.cartService
      .isProductItemInCart(productItemId)
      .subscribe((bol: boolean) => {        
        this.isProductItemInCart = bol
      });
    return this.isProductItemInCart ? 'in Cart' : 'Add product to cart';
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
