import { Component } from '@angular/core';
import { SellerType } from '../../../shared/Models/sellerType';
import { SellerService } from '../../../../services/seller.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home-sellers',
  templateUrl: './sellers.component.html',
  imports:[RouterLink],
  standalone: true,
})
export class HomeSellersComponent {
  sellers!: SellerType[];
  constructor(private sellerService: SellerService) {
    this.sellers = this.sellerService.getSellers;
  }

  sellerGroupLength(seller: SellerType) {
    return seller?.warehouse?.reduce((a, w) => a + w.groups.length, 0);
  }
}
