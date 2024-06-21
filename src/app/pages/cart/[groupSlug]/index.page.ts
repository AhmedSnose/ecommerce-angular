import { Component, OnInit, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { map, take } from 'rxjs';
import { MainContainerComponent } from '../../../components/shared/layout/main-container/main-container.component';
// import { SellerCardComponent } from '../../components/pages/group/seller-card/seller-card.component';
import { CheckoutComponent } from '../../../components/pages/cart/checkout/checkout.component';
import { RouteMeta } from '@analogjs/router';
import { cartGuard } from '../../../guards/cart.guard';
import { CartService } from '../../../services/cart.service';
import { CartGroupType } from '../../../components/shared/Models/groupType';
import { GroupService } from '../../../services/group.service';
import { isAuthenticatedGuard } from '../../../guards/isAuthenticated.guard';

export const routeMeta: RouteMeta = {
  title: 'Cart',
  canActivate: [isAuthenticatedGuard, cartGuard],
};

@Component({
  selector: 'app-groupSlug-page',
  standalone: true,
  imports: [MainContainerComponent, AsyncPipe, CheckoutComponent],

  template: `<app-checkout-component [group]="group"></app-checkout-component>`,
})
export default class GroupSlugPageComponent {
  group!: CartGroupType;
  readonly groupSlug$ = this.route.paramMap.pipe(
    map((params) => params.get('groupSlug'))
  );
  constructor(
    private cartService: CartService,
    private groupService: GroupService,
    private route: ActivatedRoute
  ) {
    this.groupSlug$.subscribe((slug) => {
      this.group = this.cartService.getGroupBySlug(String(slug));
    });
  }
}
