import { CartStateInterface } from './cartStateInterface';
import * as ACTIONS from '../cart/actions';
import { createReducer, on } from '@ngrx/store';
import { cartItem } from '../../components/shared/Models/cartType';
import {
  GROUPS_IN_CART,
  SELLERS,
  paymentMethods,
  shippingMethods,
} from '../../../DATA';
import { getGroupByProductItemId } from '../../services/group.service';
import {
  CartGroupType,
  GroupType,
} from '../../components/shared/Models/groupType';
import { ItemsInCartType } from '../../components/shared/Models/productType';

const initalState: CartStateInterface = {
  error: null,
  isLoading: false,
  groups: GROUPS_IN_CART,
};

export const cartReducers = createReducer(
  initalState,
  on(ACTIONS.getCartItems, (state) => ({ ...state, isLoading: true })),
  on(ACTIONS.addItemToCart, (state, { group , item   }) => {

    let newGroups:CartGroupType[] = JSON.parse(JSON.stringify(state.groups));
    let isGroupAlreadyInCart = false;
    let groupInCartIndex = -1;
    let isItemAlreadyInGroup = false;

    groupInCartIndex = newGroups.findIndex(g => g.id == group.id);
    isGroupAlreadyInCart = groupInCartIndex !== -1;

    if(isGroupAlreadyInCart) {
       let itemIndex = newGroups[groupInCartIndex].itemsInCart.findIndex(i => i.producItem.id == item.id);
       isItemAlreadyInGroup = itemIndex !== -1;

       if(isItemAlreadyInGroup) 
          newGroups[groupInCartIndex].itemsInCart[itemIndex].qty++;
        else newGroups[groupInCartIndex].itemsInCart.push({producItem:item , qty:1});
    } else {
      const itemsInCart = [{producItem:item,qty:1}];
      let totalValue = getTotalValue(itemsInCart);

      newGroups.push({
        addressId:group.addressId,
        createdAt:group.createdAt,
        currentSubscribers:group.currentSubscribers,
        description:group.description,
        endAt:group.endAt,
        id:group.id,
        images:group.images,
        itemsInCart:itemsInCart,
        maxSubscribers:group.maxSubscribers,
        name:group.name,
        paymentMethods:group.paymentMethods,
        products:group.products,
        sellerId:Number(group?.sellerId),
        shippingMethods:group.shippingMethods,
        slug:group.slug,
        startAt:group.startAt,
        totalValue:totalValue,
        seller:group.seller,
        status:group.status
      })
    }    

    return {
      error: state.error,
      isLoading: state.isLoading,
      groups:newGroups,
    };
  }), 
  on(ACTIONS.changeProductQtySucceed, (state, { groupIndex, itemId, qty }) => {
    let newItems = state.groups[groupIndex].itemsInCart.map((x) => {
      return x.producItem.id === itemId ? { ...x, qty } : x;
    });

    let totalValue = getTotalValue(newItems);
    let group = state.groups[groupIndex];
    group.itemsInCart = newItems;
    group.totalValue = totalValue;
    let groups = [...state.groups, group];

    return {
      error: state.error,
      isLoading: state.isLoading,
      groups,
    };
  }),
  on(ACTIONS.calculateTotalPrice, (state, { groupIndex }) => {
    let totalValue = getTotalValue(state.groups[groupIndex].itemsInCart);
    let group = state.groups[groupIndex];
    group.totalValue = totalValue;
    let groups = [...state.groups, group];

    return {
      error: state.error,
      isLoading: state.isLoading,
      groups,
    };
  }),
  on(ACTIONS.removeItem, (state, { groupId, itemId }) => {
    let groupIndex = state.groups.findIndex((g) => g.id == groupId);
    let group: CartGroupType = JSON.parse(
      JSON.stringify(state.groups[groupIndex])
    );

    group.itemsInCart = group.itemsInCart.filter(
      (e: ItemsInCartType) => e.producItem.id !== itemId
    );

    group.totalValue = getTotalValue(group.itemsInCart);

    let newGroups = JSON.parse(JSON.stringify(state.groups));
    newGroups[groupIndex]  = group;
    

    return {
      error: state.error,
      isLoading: state.isLoading,
      groups:[...newGroups],
    };
  }),
  on(ACTIONS.updateGroups, (state, { newGroups }) => {
    return {
      error: state.error,
      isLoading: state.isLoading,
      groups: newGroups,
    };
  }),
  on(ACTIONS.removeGroup, (state, { groupId }) => {

    return {
      error: state.error,
      isLoading: state.isLoading,
      groups: [...state.groups.filter(g => g.id !== groupId)],
    };
  }),
);

const getTotalValue = (items: cartItem[]) =>
  items.reduce((a, e) => a + e.qty * +e.producItem.price, 0);

const getGroupById = (groups:CartGroupType[],id:number) => groups.filter(x => x.id == id)[0]
