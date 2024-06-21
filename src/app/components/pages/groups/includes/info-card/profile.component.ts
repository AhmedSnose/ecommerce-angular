import { Component, Input, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { DatePipe, NgStyle } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { SellerService } from '../../../../../services/seller.service';
import {
  SellerDetailsType,
  SellerType,
} from '../../../../../components/shared/Models/sellerType';
import { MatTabChangeEvent, MatTabsModule } from '@angular/material/tabs';
import { MatRippleModule } from '@angular/material/core';
import { SellerPageGroupsComponent } from '../../../sellers/includes/groups/groups.component';
import { SellerPageProductsComponent } from '../../../sellers/includes/products/products.component';
import { GroupType } from '../../../../shared/Models/groupType';

@Component({
  selector: 'app-group-info-card',
  standalone: true,
  imports: [
    MatIconModule,
    DatePipe,
    RouterLink,
    NgStyle,
    MatTabsModule,
    SellerPageGroupsComponent,
    SellerPageProductsComponent,
  ],
  templateUrl: './group-info-card.component.html',
})
export class GroupInforCardComponent {
  @Input() group!: GroupType;
}
