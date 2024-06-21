import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import {  Product } from '../../shared/Models/productType';
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
  ReactiveFormsModule,
} from '@angular/forms';
import { Observable, debounceTime, map, switchMap, tap } from 'rxjs';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { SellerType } from '../../shared/Models/sellerType';
import { SellerService } from '../../../services/seller.service';

@Component({
  selector: 'app-sellers-component',
  templateUrl: './sellers.component.html',
  imports: [
    RouterLink,
    NgStyle,
    MatAutocompleteModule,
    NgClass,
    ReactiveFormsModule,
    AsyncPipe,
    NgFor,
    NgForOf,
    MatIconModule
    // need to change create a resuable component and pass the name of icon isead of import all module again 
  ],
  
  standalone: true,
})
export class SellersComponent implements OnInit {
  sellers: SellerType[] = [];
  usersForm!: any;
  filteredSellers!: Observable<SellerType[]>;

  constructor(private fb: FormBuilder,private sellerService: SellerService) {
    this.sellers = this.sellerService.getSellers;
  }

  ngOnInit() {
    this.usersForm = this.fb.group({
      userInput: null,
    });

    this.filteredSellers = this.usersForm.get('userInput').valueChanges.pipe(
      debounceTime(300),
      switchMap((value: string) => {
        return this.sellerService.search(
          { searchValue: value },
          1
        )
      })
    );
  }

  
  displayFn(product: Product) {
    return product?.name;
  }

  sellerGroupLength(seller: SellerType) {
    return seller?.warehouse?.reduce((a, w) => a + w.groups.length, 0);
  }
}
