import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgStyle } from '@angular/common';
import { Product } from '../../../../../components/shared/Models/productType';

@Component({
  selector: 'app-seller-page-products-components',
  templateUrl: './products.component.html',
  imports: [RouterLink, NgStyle, RouterLink],
  standalone: true,
  styles:`
  .product {
    border: 1px solid #D1BB9E;
    .product-info{
      background:#D1BB9E;
    }
  }
`,
})
export class SellerPageProductsComponent {
  @Input() products!: Product[];
}
