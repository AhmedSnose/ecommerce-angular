import { Component } from '@angular/core';
import { MainContainerComponent } from '../../components/shared/layout/main-container/main-container.component';
import { GroupsComponent } from '../../components/pages/groups/groups.component';
import { GroupService } from '../../services/group.service';
import { GroupType } from '../../components/shared/Models/groupType';
import { RouteMeta } from '@analogjs/router';
import {isAuthenticatedGuard} from "../../guards/isAuthenticated.guard"

export const routeMeta: RouteMeta = {
  title: 'Cart',
  canActivate: [isAuthenticatedGuard],
};


@Component({
  selector: 'app-groups-page',
  standalone: true,
  imports: [MainContainerComponent, GroupsComponent],
  template: ` <app-groups-component></app-groups-component> `,
})
export default class GroupsPageComponent {
  groups!: GroupType[];
  constructor(private groupService: GroupService) {
    this.groups = this.groupService.getGroupsWithSellerObject;
  }
}
