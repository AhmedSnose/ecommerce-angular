import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

import { Router, RouterLink } from '@angular/router';
import {
  AsyncPipe,
  CurrencyPipe,
  LocationStrategy,
  NgIf,
  NgStyle,
} from '@angular/common';
import { CartService } from '../../../../services/cart.service';
import * as PaymentGateways from '../../../../enums/paymentGateway';
import { Observable, Subscription, of } from 'rxjs';
import { cartItem } from '../../../shared/Models/cartType';
import {
  CartGroupType,
  ShippingMethodType,
} from '../../../../components/shared/Models/groupType';
import { GroupService } from '../../../../services/group.service';
import { SellerService } from '../../../../services/seller.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-checkout-component',
  templateUrl: './checkout.component.html',
  imports: [
    RouterLink,
    NgStyle,
    NgIf,
    CurrencyPipe,
    AsyncPipe,
    MatIconModule,
    MatButtonModule,
  ],
  standalone: true,
})
export class CheckoutComponent implements OnInit {
  // items$!: Observable<cartItem[]>;
  // itemsSubscription: Subscription;
  totalPrice$!: Observable<number>;
  shippingFee = 0;
  paymentFee = 0;
  paymentGatewayCod =
    PaymentGateways.PaymentGateway.PAYMENT_GATEWAY_CASH_ON_DELIVERY;
  paymentGatewayVodafoneCash =
    PaymentGateways.PaymentGateway.PAYMENT_GATEWAY_VODAFONE_CASH;

  selectedPaymentGateway: PaymentGateways.PaymentGateway | string =
    this.paymentGatewayCod;
  selectedShippingMethod = 'DELIVERY'; // you should create enum like payment
  isBtnDisabled = true;

  availableShippingMethods!: ShippingMethodType[];
  @Input({
    required: true,
  })
  group!: CartGroupType;

  constructor(
    private cartService: CartService,
    private sellerService: SellerService,
    private router: Router,
    private groupService: GroupService
  ) {
    //  this.cartService.getItems().subscribe(data =>{
    //   this.items$ = of(data)
    //   console.log(data , 'this.items$');

    // });
    this.cartService.groupSlug;
    this.totalPrice$ = this.cartService.getGroupTotalpriceBySlug(this.cartService.groupSlug);

    
  }

  ngOnInit(): void {
    console.log(this.group, 'group');

    this.paymentFee = +this.group.paymentMethods.filter(
      (s) => s.code === this.selectedPaymentGateway
    )[0].fees;
    this.shippingFee = +this.group.shippingMethods.filter(
      (s) => s.code === this.selectedShippingMethod
    )[0].fees;
  }

  onChangePaymentGateway(
    paymentGateway: PaymentGateways.PaymentGateway | string,
    fee: number | string
  ) {
    this.selectedPaymentGateway = paymentGateway;
    this.paymentFee = fee as number;
  }

  onChangeShippingMthod(method: string, fee: number | string) {
    this.selectedShippingMethod = method;
    this.shippingFee = fee as number;
  }

  // deleteItemFromCart(itemId: number) {
  //   this.cartService.delete(itemId);
  // }

  // ngOnDestroy(): void {
  //   this.itemsSubscription.unsubscribe();
  // }
}
