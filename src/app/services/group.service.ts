import { Injectable } from '@angular/core';
import {
  CartGroupType,
  GroupSearchParams,
  GroupType,
} from '../components/shared/Models/groupType';
import { Observable, Subject, of } from 'rxjs';
import { SellerService } from './seller.service';
import { GROUPS, GROUPS_IN_CART } from '../../../src/DATA';

@Injectable({
  providedIn: 'root',
})
export class GroupService {
  groups: GroupType[]=JSON.parse(JSON.stringify(GROUPS));

  sellerDrawerState$ = new Subject<boolean>();
  constructor(private sellerService: SellerService) {}
  toggleSellerDrawer(status: boolean) {
    this.sellerDrawerState$.next(status);
  }

  get getGroups() {
    return GROUPS;
  }

  get getGroupsWithSellerObject() {
    let groups: GroupType[] = JSON.parse(JSON.stringify(GROUPS));
    return groups.flatMap((group) => {
      if (group?.sellerId) {
        group.seller = this.sellerService.getSellerByid(group?.sellerId);
      }

      return group;
    });
  }

  getGroupById(id: number) {
    let groups: GroupType[] = JSON.parse(JSON.stringify(GROUPS));
    return groups.filter(g => g.id == id).flatMap((group) => {
      if (group?.sellerId) {
        group.seller = this.sellerService.getSellerByid(group?.sellerId);
      }

      return group;
    })[0];
  }

  getGroupBySlug(slug: string) {
    let groups = JSON.parse(JSON.stringify(GROUPS_IN_CART));

    return groups.filter((g:CartGroupType) => g.slug == slug).flatMap((group:CartGroupType) => {
      if (group?.sellerId) {
        group.seller = this.sellerService.getSellerByid(group?.sellerId);
      }

      return group;
    })[0];
  }


  show(slug: string) {
    let groups: GroupType[] = JSON.parse(JSON.stringify(GROUPS));
    let group = groups.filter((e) => e.slug === slug)[0];

    if (group?.sellerId)
      group.seller = this.sellerService.getSellerByid(group?.sellerId);

    return group;
  }

  search(filter: GroupSearchParams, page = 1): Observable<GroupType[]> {
    let isFiltersNotEmpty = Boolean(
      filter?.category ||
        filter?.searchValue ||
        filter?.sellerId ||
        filter?.sellerName
    );
    let groups = isFiltersNotEmpty
      ? this.getGroupsWithSellerObject.filter((item) =>
          filter?.searchValue && filter?.sellerId
            ? item.name.includes(filter.searchValue) &&
              item.sellerId === filter.sellerId
            : (filter?.searchValue && item.name.includes(filter.searchValue)) ||
              (filter?.sellerId && item.sellerId === filter.sellerId)
        )
      : this.getGroupsWithSellerObject;

    return of(groups);
  }

  getAllGroupsLockup(searchValue: string | number | null) {
    let groups = GROUPS.concat().flatMap((g) => ({
      groupName: g.name,
      groupId: g.id,
    }));

    return groups.filter((g) => {
      return (
        g.groupName?.includes(String(searchValue)) || g.groupId == searchValue
      );
    });
  }

}

export const getGroupByProductItemId = (groups:GroupType[],productItemId:number)=> {
  return groups.filter(g => g.products.filter(p => p.items.filter(i => i.id === productItemId)[0])[0])[0]
}
