import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import {
  Product,
  ProductItem,
  SearchAttributesType,
} from '../../shared/Models/productType';
import { AsyncPipe, NgFor, NgForOf, NgIf, NgStyle } from '@angular/common';
import { IsInCartPipe } from '../../../pipes/inCart.pipe';
import { CartService } from '../../../services/cart.service';
import { GroupType } from '../../shared/Models/groupType';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatOption, MatSelectModule } from '@angular/material/select';
import {
  Observable,
  debounceTime,
  distinctUntilChanged,
  of,
  startWith,
  switchMap,
} from 'rxjs';
import { ProductService } from '../../../services/product.service';
import { SellerService } from '../../../services/seller.service';
import { GroupService } from '../../../services/group.service';

@Component({
  selector: 'app-groups-component',
  templateUrl: './groups.component.html',
  imports: [
    RouterLink,
    NgStyle,
    NgIf,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatIconModule,
    MatSelectModule,
    AsyncPipe,
    NgFor,
    NgForOf,
    AsyncPipe,
  ],
  standalone: true,
})
export class GroupsComponent implements OnInit {
  @Input() groups!: GroupType[];
  groupsForm!: FormGroup;
  filteredProducts!: Observable<Product[]> | undefined;
  filteredGroups!: Observable<GroupType[]> | undefined;
  searchAttributes!: SearchAttributesType;
  sellersLockUps!: {
    sellerId: number | undefined;
    sellerName: string | undefined;
  }[];

  constructor(
    private productService: ProductService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private SellerService: SellerService,
    private groupService: GroupService
  ) {
    this.groupsForm = this.fb.group({
      groupNameInput: ['', [Validators.minLength(2)]],
      sellerInput: ['', [Validators.minLength(2)]],
    });

    this.sellersLockUps = this.SellerService.getAllSellersLockup('');
  }

  ngOnInit(): void {
    this.groupsForm
      .get('groupNameInput')
      ?.valueChanges.pipe(
        debounceTime(300),
        distinctUntilChanged(),
        startWith(''),
        switchMap((value) =>
          this.groupService.search(
            {
              category: value,
              searchValue: value,
              sellerId: this.searchAttributes?.sellerId,
            },
            1
          )
        )
      )
      .subscribe((groups) => (this.filteredGroups = of(groups)));
  }

  onSellerDropDownChange(sellerId: number) {
    this.searchAttributes = {
      ...this.searchAttributes,
      sellerId,
    };

    this.filteredGroups = this.groupService.search({
      sellerId,
    });
  }
}
