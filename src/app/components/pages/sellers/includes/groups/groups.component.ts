import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GroupType } from '../../../../../components/shared/Models/groupType';

@Component({
  selector: 'app-seller-page-groups-components',
  templateUrl: './groups.component.html',
  standalone: true,
  imports:[RouterLink],
  styles: [
    `
      .groups {
        background: linear-gradient(to bottom, transparent, white);
      }
    `,
  ],
})
export class SellerPageGroupsComponent {
  @Input() groups!: GroupType[];
}
