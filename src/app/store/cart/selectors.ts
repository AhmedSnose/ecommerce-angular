import { createSelector } from '@ngrx/store';
import { AppStateInterface } from '../appStateInterface';
import {
  CartGroupType,
  GroupType,
} from '../../components/shared/Models/groupType';

export const selectFeature = (state: AppStateInterface) => state.cart;

export const getAllGroups = () =>
  createSelector(selectFeature, (state) => state.groups);

export const itemsSelector = () =>
  createSelector(selectFeature, (state) => state.groups.flatMap((g:CartGroupType)=> g.itemsInCart));

export const totalSelector = (groupIndex: number) =>
  createSelector(selectFeature, (state) =>
    state.groups[groupIndex].itemsInCart.reduce(
      (a, e) => a + +e.producItem.price * e.qty,
      0
    )
  );

export const groupsSelector = createSelector(
  selectFeature,
  (state) => state.groups
);

export const totalItemsInCart = createSelector(selectFeature, (state) =>
  state.groups.reduce((a, i) => a + i.itemsInCart.length, 0)
);

const allProductItemsInCart = (groups: CartGroupType[]) =>
  groups.flatMap((g) => g?.itemsInCart);
