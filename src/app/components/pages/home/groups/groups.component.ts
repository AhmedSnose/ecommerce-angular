import { Component, Input } from '@angular/core';
import { GroupType } from '../../../shared/Models/groupType';
import { GroupService } from '../../../../services/group.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home-groups',
  templateUrl: './groups.component.html',
  standalone: true,
  imports:[RouterLink]
})
export class HomeGroupsComponent {
  groups:GroupType[];

  constructor(private groupService: GroupService) {
    this.groups = this.groupService.getGroupsWithSellerObject
  }
}
