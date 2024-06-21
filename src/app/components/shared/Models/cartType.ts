import { ProductItem } from "./productType";

export interface cartItem {
  producItem: ProductItem;
  qty: number;
  userData?:any
}