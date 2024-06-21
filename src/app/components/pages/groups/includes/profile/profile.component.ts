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
import { GroupInforCardComponent } from '../info-card/profile.component';
import { GroupType } from '../../../../shared/Models/groupType';

@Component({
  selector: 'app-group-profile',
  standalone: true,
  imports: [
    MatIconModule,
    DatePipe,
    RouterLink,
    NgStyle,
    MatTabsModule,
    SellerPageGroupsComponent,
    SellerPageProductsComponent,
    GroupInforCardComponent
  ],
  styleUrl: './profile.component.css',
  templateUrl: './profile.component.html',
})
export class GroupProfileComponent implements OnInit {
  @Input() group!: GroupType;
  // seller!: SellerDetailsType;
  tabsRoutes = [['/products']];
  constructor(private sellerService: SellerService, private router: Router) {}

  ngOnInit(): void {
    // this.sellerDetails = this.sellerService.getSellerDetails(this.seller);
  }

  seeAll(tabIndex: number | null) {
    if (tabIndex !== null)
      this.router.navigate(this.tabsRoutes[tabIndex], {
        queryParams: {
          sellerId: this.group.sellerId,
          groupName: this.group.name,
        },
      });
  }
}
