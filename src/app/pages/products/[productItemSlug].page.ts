import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Subscription, map } from 'rxjs';
import { MainContainerComponent } from '../../components/shared/layout/main-container/main-container.component';

import { ProductService } from '../../services/product.service';
import {
  AvailableColors,
  AvailableSizes,
  Product,
} from '../../components/shared/Models/productType';
import { productTypeEnums } from '../../enums/productTypes';
import { ProductPageComponent } from '../../components/pages/products/includes/product/product.component';

import { RouteMeta } from '@analogjs/router';
import {isAuthenticatedGuard} from "../../guards/isAuthenticated.guard"

export const routeMeta: RouteMeta = {
  title: 'Cart',
  canActivate: [isAuthenticatedGuard],
};


@Component({
  selector: 'app-product',
  standalone: true,
  imports: [MainContainerComponent, AsyncPipe, ProductPageComponent],
  template: `<app-product-page [product]="product"></app-product-page> `,
})
export default class ProductItemComponent implements OnInit, OnDestroy {
  product!: Product;
  paramsSubscription!: Subscription;
  constructor(
    private producService: ProductService,
    private route: ActivatedRoute
  ) {}

  readonly params$ = this.route.paramMap.pipe(
    map((params) => {
      return {
        // productId: params.get('productId'),
        productItemSlug: params.get('productItemSlug'),
      };
    })
  );

  ngOnInit(): void {
    this.paramsSubscription = this.params$.subscribe((params) => {
      let product = this.producService.getProductByProductItemSlug(
        params.productItemSlug ?? ''
      );

      let colors: AvailableColors[] = [];
      let sizes: AvailableSizes[] = [];

      if (product.productType == productTypeEnums.CLOTHES) {
        product.items.forEach((item, i) =>
          item.variations.forEach((v) => {
            if (v.key == 'color') {
              colors.push({
                img: item.images[0],
                itemsId: item.id,
                qty: item?.qty_in_stock,
                color: v.value,
              });
            }

            if (v.key == 'size') {
              let isSizeNotExists =
                sizes.findIndex((s) => s.size == v.value) == -1;

              if (isSizeNotExists) {
                sizes.push({
                  itemsId: item.id,
                  qty: item?.qty_in_stock,
                  size: v.value,
                });
              }
            }
          })
        );
      }

      // let selectedItem = product.items.filter((x) =>
      //   console.log(x.slug, params.productItemSlug)
      // );

      product.availableColors = colors;
      product.availableSizes = sizes;
      product.selectedItem = this.producService.getItemBySlug(
        params.productItemSlug ?? ''
      );

      this.product = product;
    });
  }

  ngOnDestroy(): void {
    this.paramsSubscription.unsubscribe();
  }
}
