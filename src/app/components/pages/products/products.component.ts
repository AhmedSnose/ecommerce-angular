import {
  AfterContentInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { Product, SearchAttributesType } from '../../shared/Models/productType';
import { MatSelect, MatSelectModule } from '@angular/material/select';

import {
  AsyncPipe,
  CommonModule,
  NgClass,
  NgFor,
  NgForOf,
  NgStyle,
} from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormGroupDirective,
  FormsModule,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  Observable,
  debounceTime,
  distinctUntilChanged,
  map,
  of,
  startWith,
  switchMap,
  tap,
} from 'rxjs';
import {
  MatAutocomplete,
  MatAutocompleteModule,
  MatAutocompleteTrigger,
} from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { SellerType } from '../../shared/Models/sellerType';
import { SellerService } from '../../../services/seller.service';
import { GroupService } from '../../../services/group.service';

@Component({
  selector: 'app-products-component',
  templateUrl: './products.component.html',
  imports: [
    RouterLink,
    NgStyle,
    MatAutocompleteModule,
    NgClass,
    ReactiveFormsModule,
    AsyncPipe,
    NgFor,
    NgForOf,
    MatIconModule,
    MatSelectModule,

    // need to change create a resuable component and pass the name of icon isead of import all module again
  ],
  standalone: true,
})
export class ProductsPageComponent implements OnInit, OnDestroy {
  productsForm!: FormGroup;
  filteredProducts!: Observable<Product[]> | undefined;
  searchAttributes!: SearchAttributesType;
  sellersLockUps!: {
    sellerId: number | undefined;
    sellerName: string | undefined;
  }[];
  groupsLockUps!: {
    groupId: number | undefined;
    groupName: string | undefined;
  }[];

  constructor(
    private productService: ProductService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private SellerService: SellerService,
    private groupService: GroupService
  ) {
    this.productsForm = this.fb.group({
      productNameInput: ['', [Validators.minLength(2)]],
      sellerInput: ['', [Validators.minLength(2)]],
    });

    this.sellersLockUps = this.SellerService.getAllSellersLockup('');
    this.groupsLockUps = this.groupService.getAllGroupsLockup('');
  }

  ngOnInit() {
    this.setQueryParamsToInputs();

    this.productsForm
      .get('productNameInput')
      ?.valueChanges.pipe(
        debounceTime(300),
        distinctUntilChanged(),
        startWith(''), // Initial value for filtering when component loads
        switchMap((value) =>
          this.productService.search(
            {
              category: value,
              searchValue: value,
              sellerId: this.searchAttributes.sellerId,
              groupId: this.searchAttributes.groupId,
            },
            1
          )
        )
      )
      .subscribe((products) => (this.filteredProducts = of(products)));
  }

  private setQueryParamsToInputs() {
    this.route.queryParams.subscribe((params) => {
      let sellerName = params['sellerName'];
      let sellerId = params['sellerId'];
      let groupId = params['groupId'];
      let groupName = params['groupName'];

      this.searchAttributes = {
        ...this.searchAttributes,
        sellerName,
        groupName,
        sellerId: +sellerId,
        groupId: +groupId,
      };
    });
  }

  onSellerDropDownChange(sellerId: number) {
    this.searchAttributes = {
      ...this.searchAttributes,
      sellerId,
      groupId: 0,
    };

    this.filteredProducts = this.productService.search({
      sellerId,
    });
  }

  onGroupDropDownChange(groupId: number) {
    this.searchAttributes = {
      ...this.searchAttributes,
      groupId,
      sellerId: 0,
    };

    this.filteredProducts = this.productService.search({
      groupId,
    });
  }

  ngOnDestroy(): void {}
}
