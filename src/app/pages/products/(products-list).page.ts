import { Component } from '@angular/core';
import { MainContainerComponent } from '../../components/shared/layout/main-container/main-container.component';
import { ProductsPageComponent } from '../../components/pages/products/products.component';

import { RouteMeta } from '@analogjs/router';
import {isAuthenticatedGuard} from "../../guards/isAuthenticated.guard"

export const routeMeta: RouteMeta = {
  canActivate: [isAuthenticatedGuard],
};


@Component({
  selector: 'app-products',
  standalone: true,
  imports: [MainContainerComponent , ProductsPageComponent],
  template: ` 
      <app-products-component ></app-products-component>
`,
})
export default class ProductsComponent {}
