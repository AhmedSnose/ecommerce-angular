import { Injectable } from '@angular/core';
import {
  // SELLERS,
  SellerDetailsType,
  SellerType,
  sellerSearchParams,
} from '../components/shared/Models/sellerType';
import { Observable, of } from 'rxjs';
import { SELLERS } from '../../DATA';

@Injectable({
  providedIn: 'root',
})
export class SellerService {
  constructor() {}

  get getSellers(): SellerType[] {
    let sellers:SellerType[] = JSON.parse(JSON.stringify(SELLERS));
    sellers.forEach((seller) => {
      seller.warehouse?.forEach((warehouse) => {
        warehouse.groups.forEach((group) => {
          group.seller = {
            sellerId: seller?.sellerId,
            desccription: seller.desccription,
            name: seller.name,
            slug: seller.slug,
          };
        });
      });
    });
    return sellers;
  }

  show(slug: string) {
    return SELLERS.filter((e) => e.slug === slug)[0];
  }

  getSellerByid(id: number) {
    return SELLERS.filter((e) => e.sellerId === id)[0];
  }

  search(filter: sellerSearchParams, page = 1): Observable<SellerType[]> {
    // return this.http
    //   .get<ITodos[]>('https://jsonplaceholder.typicode.com/todos')
    //   .pipe(
    //     map((data) =>
    //       data.filter((item) => item.title.includes(filter.searchValue))
    //     )
    //   );

    return of(
      SELLERS.filter((item) => item?.name?.includes(filter?.searchValue ?? ''))
    );
  }

  getSellerDetails(seller: SellerType): SellerDetailsType {
    const groups =
      seller.warehouse?.flatMap((warehouse) => warehouse.groups) || [];
    const products = groups?.flatMap((group) => group.products) || [];
    return {
      groups,
      products,
    };
  }

  getAllSellersLockup(searchValue: string | number | null) {
    let sellers = SELLERS.concat().flatMap((s) => ({
      sellerName: s.name,
      sellerId: s.sellerId,
    }));
    
    return sellers.filter((s) => {
      return (
        s.sellerName?.includes(String(searchValue)) || s.sellerId == searchValue
      );
    });
  }
}
