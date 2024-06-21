import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppStateInterface } from '../store/appStateInterface';
import {
  getAllGroups,
  groupsSelector,
  itemsSelector,
  totalSelector,
} from '../store/cart/selectors';
import { Subject, map, of, tap } from 'rxjs';
import {
  addItemToCart,
  changeProductQty,
  removeGroup,
  removeItem,
  updateGroups,
} from '../store/cart/actions';
import { ProductItem } from '../components/shared/Models/productType';
import {
  CartGroupType,
  GroupType,
} from '../components/shared/Models/groupType';
import { GROUPS } from './../../../src/DATA';
import { ProductService } from './product.service';
import { SellerService } from './seller.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  groupSlug$ = new Subject<string | null>();
  groupSlug!: string;
  groupsInCart: CartGroupType[] = [];

  constructor(
    private store: Store<AppStateInterface>,
    private productService: ProductService,
    private sellerService: SellerService
  ) {
    this.groupSlug$.subscribe((slug) =>
      slug !== null ? (this.groupSlug = slug) : null
    );

    this.store.pipe(select(getAllGroups())).subscribe((data) => {
      this.groupsInCart = data;
    });
  }

  // setGroupsInCart(groups: CartGroupType[]) {
  //   this.groupsInCart = JSON.parse(JSON.stringify(groups));
  // }

  setGroupIndex(slug: string | null) {
    this.groupSlug$.next(slug);
  }

  getAllGrous() {
    return this.store.pipe(select(groupsSelector));
  }

  getGroupBySlug(slug: string) {
    const result = this.groupsInCart.filter(
      (g: CartGroupType) => g.slug == slug
    )[0];

    return result;
  }

  getGroupTotalpriceBySlug(slug: string) {
    let groupIndex = this.getGrouptIndexBySlug(slug);
    return this.store.pipe(select(totalSelector(groupIndex)));
  }

  isProductItemInCart(productItemId: number) {
    let cartItems = this.store.pipe(select(itemsSelector()));

    return cartItems.pipe(
      map((data) => {
        return data?.findIndex((x) => x.producItem.id == productItemId) != -1;
      })
    );
  }

  addItemToCart(item: ProductItem, group: GroupType) {
    this.store.dispatch(addItemToCart({ item, group }));
  }

  // changeProductQty(productItemId: number, qty: number) {
  //   let groupIndex = this.getGrouptIndexBySlug(this.groupSlug);

  //   this.store.dispatch(
  //     changeProductQty({ groupIndex, itemId: productItemId, qty })
  //   );
  // }

  // delete(itemId: number) {
  //   let groupIndex = this.getGrouptIndexBySlug(this.groupSlug);

  //   this.store.dispatch(removeItem({ groupIndex, itemId }));
  // }

  calculateItemsTotalPriceInGroup(group: CartGroupType) {
    return group.itemsInCart.reduce(
      (a, e) => a + e.qty * +e.producItem.price,
      0
    );
  }

  calculateTotalPriceInAllGroups(groups: CartGroupType[] | null) {
    return groups !== null
      ? groups.reduce(
          (ga, ge) =>
            ga +
            ge.itemsInCart.reduce((a, e) => a + e.qty * +e.producItem.price, 0),
          0
        )
      : 0;
  }

  private getGrouptIndexBySlug(slug: string) {
    return this.groupsInCart.findIndex((item) => item.slug === slug);
  }

  updateGroups(groups: CartGroupType[]) {
    this.store.dispatch(updateGroups({ newGroups: groups }));
  }

  removeItemFromCart(groupId: number, producItemId: number) {
    this.store.dispatch(removeItem({ groupId, itemId: producItemId }));
  }

  removeGroupFromCart(groupId: number) {
    this.store.dispatch(removeGroup({ groupId }));
  }
}
