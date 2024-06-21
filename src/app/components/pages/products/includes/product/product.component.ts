import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NgIf, NgStyle } from '@angular/common';
import { CartService } from '../../../../../services/cart.service';
import { IsInCartPipe } from '../../../../../pipes/inCart.pipe';
import {
  Product,
  ProductItem,
} from '../../../../../components/shared/Models/productType';
import { ProductService } from '../../../../../services/product.service';
import { GroupInforCardComponent } from '../../../groups/includes/info-card/profile.component';
import { GroupType } from '../../../../../components/shared/Models/groupType';
import { GroupService } from '../../../../../services/group.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-page',
  templateUrl: './product.component.html',
  imports: [RouterLink, NgStyle, NgIf, IsInCartPipe, GroupInforCardComponent],
  standalone: true,
})
export class ProductPageComponent implements OnInit, OnDestroy {
  @Input({
    required: true,
  })
  product!: Product;
  group!: GroupType;
  selectedImg!: string | unknown;
  isProductItemInCart: boolean = false;
  subscription!: Subscription;

  constructor(
    private cartService: CartService,
    private productService: ProductService,
    private groupService: GroupService,
    private router: Router
  ) {}

  ngOnInit(): void
  {
    if (this.product.groupId) {
      this.group = this.groupService.getGroupById(this.product.groupId);
    }

    this.subscription = this.cartService
      .isProductItemInCart(this.product?.selectedItem?.id ?? -1)
      .subscribe((bol: boolean) => {
        this.isProductItemInCart = bol;
      });
  }

  addItemToCart(item: ProductItem, group: GroupType)
  {
    this.cartService.addItemToCart(item, group);
  }

  selectMainImg(img: string)
  {
    this.selectedImg = img;
  }

  getItemSlugByItemId(id: number)
  {
    return this.productService.getItemSlugByItemId(id);
  }
  
  goToCart()
  {
    this.router.navigate(['/cart']);
  }

  ngOnDestroy(): void
  {
    this.subscription.unsubscribe();
  }
}
