import { AfterContentInit, Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { MainContainerComponent } from '../../components/shared/layout/main-container/main-container.component';
import { LoadingDirective } from '../../directives/loading/loading.directive';
import { SellerProfileComponent } from '../../components/pages/sellers/includes/profile/profile.component';
import { SellerType } from '../../components/shared/Models/sellerType';
import { SellerService } from '../../services/seller.service';
import { RouteMeta } from '@analogjs/router';
import {isAuthenticatedGuard} from "../../guards/isAuthenticated.guard"

export const routeMeta: RouteMeta = {
  canActivate: [isAuthenticatedGuard],
};

@Component({
  selector: 'app-group',
  standalone: true,
  imports: [
    MainContainerComponent,
    AsyncPipe,
    SellerProfileComponent,
    LoadingDirective,
  ],
  template: `
    <div [appLoading]="isLoading">
      <app-seller-profile [seller]="seller"></app-seller-profile>
    </div>
  `,
})
export default class GroupComponent implements AfterContentInit {
  isLoading = true;
  private readonly route = inject(ActivatedRoute);
  readonly sellerSlug$ = this.route.paramMap.pipe(
    map((params) => params.get('slug'))
  );
  seller!: SellerType;
  constructor(private sellerService: SellerService) {
    this.sellerSlug$.subscribe(
      (slug) => (this.seller = this.sellerService.show(String(slug)))
    );
  }

  ngAfterContentInit(): void {
    setTimeout(()=>this.isLoading = false,3000)
    
    // api not like this
  }
}
