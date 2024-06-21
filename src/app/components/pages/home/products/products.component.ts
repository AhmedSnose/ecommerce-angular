import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '../../../shared/Models/productType';
import { ProductService } from '../../../../services/product.service';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-home-products',
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
export class HomeProductsComponent {
  products: Product[];

  constructor(private productService: ProductService) {
    this.products = this.productService.getAllProducts();
  }
}
