import { AfterContentInit, Component, OnInit, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { MainContainerComponent } from '../../components/shared/layout/main-container/main-container.component';
import { GroupService } from '../../services/group.service';
import { GroupType } from '../../components/shared/Models/groupType';
import { LoadingDirective } from '../../directives/loading/loading.directive';
import { SellerType } from '../../components/shared/Models/sellerType';
import { SellerService } from '../../services/seller.service';
import { GroupProfileComponent } from '../../components/pages/groups/includes/profile/profile.component';

import { RouteMeta } from '@analogjs/router';
import {isAuthenticatedGuard} from "../../guards/isAuthenticated.guard"

export const routeMeta: RouteMeta = {
  title: 'Cart',
  canActivate: [isAuthenticatedGuard],
};


@Component({
  selector: 'app-group',
  standalone: true,
  imports: [
    MainContainerComponent,
    AsyncPipe,
    GroupProfileComponent,
    LoadingDirective,
  ],
  template: `
    <!-- <div class="main-panel">hi from group ID: {{ groupSlug$ | async }}</div> -->
    <div [appLoading]="isLoading">
      <app-group-profile [group]="group"></app-group-profile>
    </div>
  `,
})
export default class GroupComponent implements AfterContentInit {
  isLoading = true;
  private readonly route = inject(ActivatedRoute);
  readonly groupSlug$ = this.route.paramMap.pipe(
    map((params) => params.get('slug'))
  );
  group!: GroupType;
  // seller!: SellerType;
  constructor(
    private groupService: GroupService,
    private sellerService: SellerService
  ) {
    this.groupSlug$.subscribe(
      (slug) => (this.group = this.groupService.show(String(slug)))
    );
  }

  // ngOnInit(): void {
  //   if(this.group.sellerId !== null || this.group.sellerId !== undefined) {
  //    this.seller = this.sellerService.getSellerByid(Number(this.group.sellerId));
  //   }
  // }

  ngAfterContentInit(): void {
    this.isLoading = false;
    // this should handled by api request
  }
}
