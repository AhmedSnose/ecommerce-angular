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
import { SellerPageGroupsComponent } from '../groups/groups.component';
import { SellerPageProductsComponent } from '../products/products.component';
import { MatRippleModule } from '@angular/material/core';

@Component({
  selector: 'app-seller-profile',
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
  styleUrl: './profile.component.css',
  templateUrl: './profile.component.html',
})
export class SellerProfileComponent implements OnInit {
  @Input() seller!: SellerType;
  sellerDetails!: SellerDetailsType;
  tabsRoutes = [['/groups'], ['/products']];
  constructor(private sellerService: SellerService, private router: Router) {}

  ngOnInit(): void {
    this.sellerDetails = this.sellerService.getSellerDetails(this.seller);
  }

  seeAll(tabIndex: number | null) {
    if (tabIndex !== null)
      this.router.navigate(this.tabsRoutes[tabIndex], {
        queryParams: {
          sellerId: this.seller.sellerId,
          sellerName: this.seller.name,
        },
      });
  }
}
