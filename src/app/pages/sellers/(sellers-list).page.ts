import { Component } from '@angular/core';
import { SellersComponent } from '../../components/pages/sellers/sellers.component';
import { MainContainerComponent } from '../../components/shared/layout/main-container/main-container.component';
import { RouteMeta } from '@analogjs/router';
import {isAuthenticatedGuard} from "../../guards/isAuthenticated.guard"

export const routeMeta: RouteMeta = {
  canActivate: [isAuthenticatedGuard],
};

@Component({
  selector: 'app-sellers-page',
  standalone: true,
  imports: [MainContainerComponent, SellersComponent],
  template: `<app-sellers-component></app-sellers-component> `,
})
export default class SellersPageComponent {}
