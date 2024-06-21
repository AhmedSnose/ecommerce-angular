import { Component, Input, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {
  AsyncPipe,
  CurrencyPipe,
  JsonPipe,
  NgIf,
  NgStyle,
} from '@angular/common';
import { CartService } from '../../../../services/cart.service';
import {
  Observable,
  debounceTime,
  distinct,
  distinctUntilChanged,
  of,
} from 'rxjs';
import { CartGroupType, GroupType } from '../../../shared/Models/groupType';
import { AccordionModule } from 'primeng/accordion';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { ProductService } from '../../../../services/product.service';
import {
  ItemsInCartType,
  ProductItem,
} from '../../../../components/shared/Models/productType';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-select-group-component',
  templateUrl: './select-group.component.html',
  imports: [
    RouterLink,
    NgStyle,
    NgIf,
    CurrencyPipe,
    AsyncPipe,
    AccordionModule,
    AvatarModule,
    BadgeModule,
    ReactiveFormsModule,
    JsonPipe,
    MatIcon
  ],
  standalone: true,

})
export class SelectGroupComponent implements OnInit {
  // groups$!: Observable<CartGroupType[]>;
  groups!: CartGroupType[];
  form!: FormGroup;

  constructor(
    private cartService: CartService,
    private router: Router,
    private productsService: ProductService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.cartService.getAllGrous().subscribe((groups) => {
      this.groups = groups;

      this.form = this.fb.group({
        cart: this.fb.array(groups.map((group) => this.createGroupForm(group))),
      });

      this.form.valueChanges
        .pipe(debounceTime(300), distinctUntilChanged())
        .subscribe((data) => {
          let newGroups:CartGroupType[] = [];
            data?.cart?.forEach((fg:{groupId:number,items:[{id:number,qty:number}]}) => {
              let index = this.groups.findIndex((g:CartGroupType) => g.id === fg.groupId);
              let group:CartGroupType = JSON.parse(JSON.stringify(groups))[index];
              
              fg.items.forEach(it => {
                let index = group.itemsInCart.findIndex((gi:ItemsInCartType) => gi.producItem.id === it.id)
                if(index !== -1)
                  {
                    group.itemsInCart[index].qty = it.qty                                        
                  }

              })

              newGroups.push(group);   
            })

            this.cartService.updateGroups(newGroups);
        });
    });
  }

  createGroupForm(group: CartGroupType): FormGroup {
    return this.fb.group({
      groupId: group.id,
      items: this.fb.array(
        group.itemsInCart.map((item) =>
          this.fb.group({
            id: item.producItem.id,
            qty: item.qty,
          })
        )
      ),
    });
  }

  calculateItemsTotalPriceInGroup(group: CartGroupType) {
    return this.cartService.calculateItemsTotalPriceInGroup(group);
  }

  calculateTotalPriceInAllGroups(groups: CartGroupType[] | null) {
    return this.cartService.calculateTotalPriceInAllGroups(groups);
  }

  setGroupIndex(slug: string) {
    this.cartService.setGroupIndex(slug);
    this.router.navigate(['/cart', slug]);
  }

  getColorsAndSizesObjectFromProductItem(
    productItem: ProductItem
  ): { colors: any; sizes: any } | null {
    let data =
      this.productsService.getColorsAndSizesObjectFromProdouctItem(productItem);
    console.log(data, 'data');
    return data;
  }

  getTotalItemsCount(itemsInCart: ItemsInCartType[]) {
    return itemsInCart.reduce(
      (a: number, i: ItemsInCartType) => (a += i.qty),
      0
    );
  }

  getFormGroupByGroupId(id: number): any {
    return (this.form.controls['cart'] as FormArray).controls.filter(
      (fg) => (fg as FormGroup).controls['groupId'].value == id
    )[0];
  }

  removeItemFromCart(groupId:number,producItemId:number){
    this.cartService.removeItemFromCart(groupId,producItemId);
  } 

  removeGroupFromCart(groupId:number){
    this.cartService.removeGroupFromCart(groupId);
  }

  goToCheckout(slug:string){
    this.cartService.setGroupIndex(slug);
    this.router.navigate(['/cart' , slug])
  }
}
