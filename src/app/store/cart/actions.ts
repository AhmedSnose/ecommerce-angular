import { createAction, props } from '@ngrx/store';
import {
  CartGroupType,
  GroupType,
} from '../../components/shared/Models/groupType';
import { ProductItem } from '../../components/shared/Models/productType';
export const GET_CART_ITEMS = '[Cart] GET_CART_ITEMS';
export const ADD_ITEM_TO_CART_SUCCEEDED = '[Cart] ADD_ITEM_TO_CART_SUCCEEDED';
export const ADD_ITEM_TO_CART = '[Cart] ADD_ITEM_TO_CART';
export const CHANGE_QTY = '[Cart] CHANGE_QTY';
export const CHANGE_QTY_SUCCEED = '[Cart] CHANGE_QTY_SUCCEED';
export const CALCULATE_TOTAL_PRICE = '[Cart] CALCULATE_TOTAL_PRICE';
export const REMOVE_ITEM = '[Cart] REMOVE_ITEM';
export const UPDATE_GROUPS = '[Cart] UPDATE_GROUPS';
export const REMOVE_GROUP = '[Cart] REMOVE_GROUP';
export const GET_CART_ITEMS_FROM_API = '[Cart] GET_CART_ITEMS_FROM_API';
export const GET_CART_ITEMS_FROM_API_SUCCEED =
  '[Cart] GET_CART_ITEMS_FROM_API_SUCCEED';

export const getCartItems = createAction(GET_CART_ITEMS);

export const addItemToCartSucceeded = createAction(
  ADD_ITEM_TO_CART_SUCCEEDED,
  props<{ item: ProductItem; productId: number; groupId: number }>()
);


export const addItemToCart = createAction(
  ADD_ITEM_TO_CART,
  props<{ item: ProductItem; group:GroupType }>()
);


export const changeProductQty = createAction(
  CHANGE_QTY,
  props<{ groupIndex: number; itemId: number; qty: number }>()
);
export const changeProductQtySucceed = createAction(
  CHANGE_QTY_SUCCEED,
  props<{ groupIndex: number; itemId: number; qty: number }>()
);


export const calculateTotalPrice = createAction(
  CALCULATE_TOTAL_PRICE,
  props<{ groupIndex: number }>()
);

export const removeItem = createAction(
  REMOVE_ITEM,
  props<{ groupId: number; itemId: number }>()
);

export const updateGroups = createAction(
  UPDATE_GROUPS,
  props<{ newGroups: CartGroupType[] }>()
);

export const removeGroup = createAction(
  REMOVE_GROUP,
  props<{ groupId: number }>()
);
