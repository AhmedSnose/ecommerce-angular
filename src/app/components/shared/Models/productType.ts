import { productTypeEnums } from '../../../enums/productTypes';

export interface Category {
  id: number;
  parent_id: number | null;
  name: string;
  description: string;
  img: string;
}

export interface ProductItem {
  productId: number;
  title: string;
  description?: string;
  id: number;
  slug:string;
  qty_in_stock: number;
  images: string[];
  price: number | string;
  variations: Variation[];

  // UI
  color?:any;
  size?:any
}

export interface Variation {
  key: string;
  value: string | string[] | unknown;
}

export interface Product {
  id: number;
  slug:string;
  productType?: productTypeEnums;
  category: Category;
  name: string;
  description: string;
  unit: string;
  images: string[];
  items: ProductItem[];
  groupId: number;
  sellerId: number;

  // ui
  availableSizes?: AvailableSizes[];
  availableColors?: AvailableColors[];
  selectedItem?: ProductItem;
}

export interface AvailableSizes {
  itemsId: number;
  qty: number;
  size: unknown | string;
}

export interface AvailableColors {
  itemsId: number;
  img: string;
  qty: number;
  color: string | unknown;
}

export interface prodcutSearchParams {
  searchValue?: string;
  category?: string;
  sellerId?: number;
  sellerName?: string | null;
  groupId?: number;
  groupName?: string | null; 
}

// export const PRODUCTS: Product[] = [
//   {
//     id: 1,
//     name: 'general T-Shirts',
//     slug:'general-T-Shirts',
//     description: 'general',
//     groupId:2,
//     sellerId: 1,
//     category: {
//       id: 1,
//       parent_id: 1,
//       name: 'clothes (T-Shirts)',
//       description:
//         'T-Shirts is the best , with different sizes parent name is clothes',
//       img: '',
//     },
//     unit: 'piece',
//     productType: productTypeEnums.CLOTHES,
//     images: [''],
//     items: [
//       {
//         title: 'S- L color black',
//         id: 1,
//         productId: 1,
//         slug:'slug-9',
//         qty_in_stock: 20,
//         images: [
//           'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=1915&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
//         ],
//         price: 15.99,
//         variations: [
//           {
//             key: 'size',
//             value: 'L',
//           },
//           {
//             key: 'color',
//             value: '#111111',
//           },
//         ],
//       },
//       {
//         title: 'S- Xl color b6bfcf',
//         slug:'slug-10',
//         id: 2,
//         productId: 1,
//         qty_in_stock: 50,
//         images: [
//           'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
//         ],
//         price: 18.99,
//         variations: [
//           {
//             key: 'size',
//             value: 'XL',
//           },
//           {
//             key: 'color',
//             value: '#b6bfcf',
//           },
//         ],
//       },
//     ],
//   },
//   {
//     id: 2,
//     sellerId: 3,
//     slug:'tomatos',
//     groupId:2,
//     category: {
//       id: 3,
//       parent_id: 2,
//       name: 'vegetables',
//       description:
//         'vegetables - fruits (tomato) is the best , with different sizes parent is groceries',
//       img: '',
//     },
//     productType: productTypeEnums.VEGETABLES,
//     name: 'tomatos',
//     description:
//       'tomatos || Cherry tomato , Standard Globe , Beefsteak Tomatoes  , Roma Tomatoes',
//     images: [''],
//     unit: 'kg',
//     items: [
//       {
//         title: 'EXD-2024-05-01 C-storage',
//         id: 4,
//         slug:'slug-1',
//         productId: 2,
//         qty_in_stock: 80,
//         images: [
//           'https://www.liveeatlearn.com/wp-content/uploads/2022/08/cherry-tomato-768x512.jpg',
//         ],
//         price: 29.99,
//         variations: [
//           {
//             key: 'expiration',
//             value: '2024-05-01',
//           },
//           {
//             key: 'condition',
//             value: 'storage',
//           },
//         ],
//       },
//       {
//         title: 'fresh - 2024-06-06',
//         id: 5,
//         slug:'slug-2',
//         productId: 2,
//         qty_in_stock: 60,
//         images: [
//           'https://www.liveeatlearn.com/wp-content/uploads/2019/05/common-types-of-tomatoes-14-768x439.jpg',
//         ],
//         price: 34.99,
//         variations: [
//           {
//             key: 'expiration',
//             value: '2024-06-06',
//           },
//           {
//             key: 'condition',
//             value: 'fresh',
//           },
//         ],
//       },
//     ],
//   },
//   {
//     id: 3,
//     sellerId: 1,
//     groupId:2,
//     category: {
//       id: 4,
//       parent_id: null,
//       name: 'groceries (oils)',
//       description:
//         '(oil) is the best , with different sizes parent is groceries',
//       img: '',
//     },
//     productType: productTypeEnums.GROCERIES,
//     name: 'Cooking oil',
//     slug:'cooking-oil',
//     description: 'Cooking oil || Olive , Avocado , Rice bran , Safflower',
//     images: [''],
//     unit: 'liter',
//     items: [
//       {
//         id: 4,
//         title: 'Liquid Olive Oil',
//         productId: 3,
//         slug:'slug-3',
//         qty_in_stock: 20,
//         images: [
//           'https://m.media-amazon.com/images/I/61oi+4QkJPL._AC_SL1500_.jpg',
//         ],
//         price: 29.99,
//         variations: [
//           {
//             key: 'expiration',
//             value: '2024-05-01',
//           },
//           {
//             key: 'format',
//             value: 'Liquid',
//           },
//           {
//             key: 'Manufacturer',
//             value: 'Atlas',
//           },
//           {
//             key: 'Made in',
//             value: 'Egypt',
//           },
//           {
//             key: 'Flavor',
//             value: 'Olive',
//           },
//           {
//             key: 'Brand',
//             value: 'Generic',
//           },
//         ],
//       },
//     ],
//   },
//   {
//     id: 5,
//     sellerId: 3,
//     groupId:1,
//     category: {
//       id: 5,
//       parent_id: null,
//       name: 'adidas Shoes',
//       description:
//         'adidas shoes is the best , with different sizes parent is adidas',
//       img: '',
//     },
//     productType: productTypeEnums.CLOTHES,
//     name: 'adidas shoes (Running)',
//     slug:'adidas-shoes-Running',
//     description: 'adidas shoes (Running) || Black , White',
//     unit: 'pair',
//     images: [''],
//     items: [
//       {
//         id: 5,
//         qty_in_stock: 1,
//         productId: 5,
//         slug:'slug-4',
//         title: 'size 55 color black',
//         images: [
//           'https://m.media-amazon.com/images/I/61tbEu+o9eL._AC_SY575_.jpg',
//         ],
//         price: 49.99,
//         variations: [
//           {
//             key: 'size',
//             value: '55',
//           },
//           {
//             key: 'color',
//             value: '#333',
//           },
//         ],
//       },
//       {
//         title: 'size 35 color white',
//         id: 6,
//         qty_in_stock: 5,
//         slug:'slug-5',
//         productId: 5,
//         images: [
//           'https://m.media-amazon.com/images/I/61BwJvmam9L._AC_SY575_.jpg',
//         ],
//         price: 49.99,
//         variations: [
//           {
//             key: 'size',
//             value: '35',
//           },
//           {
//             key: 'color',
//             value: '#fff',
//           },
//         ],
//       },
//       {
//         title: 'size 44 color a2252d',
//         id: 7,
//         qty_in_stock: 3,
//         slug:'slug-6',
//         productId: 5,
//         images: [
//           'https://m.media-amazon.com/images/I/4182KiGxthL._AC_SX575_.jpg',
//         ],
//         price: 49.99,
//         variations: [
//           {
//             key: 'size',
//             value: '44',
//           },
//           {
//             key: 'color',
//             value: '#a2252d',
//           },
//         ],
//       },
//       {
//         title: 'size 44 color 26324a',
//         id: 8,
//         qty_in_stock: 3,
//         slug:'slug-7',
//         productId: 5,
//         images: [
//           'https://m.media-amazon.com/images/I/61Ioa0OfCAL._AC_SY695_.jpg',
//         ],
//         price: 49.99,
//         variations: [
//           {
//             key: 'size',
//             value: '44',
//           },
//           {
//             key: 'color',
//             value: '#26324a',
//           },
//         ],
//       },
//       {
//         title: 'size 44 color a2a2a2',
//         slug:'slug-8',
//         id: 9,
//         qty_in_stock: 3,
//         productId: 5,
//         images: [
//           'https://m.media-amazon.com/images/I/51EqFGZT6WL._AC_SY575_.jpg',
//         ],
//         price: 49.99,
//         variations: [
//           {
//             key: 'size',
//             value: '44',
//           },
//           {
//             key: 'color',
//             value: '#a2a2a2',
//           },
//         ],
//       },
//     ],
//   },
// ];


export interface SearchAttributesType {
  sellerId?: number;
  sellerName?: string;
  productName?: string;
  groupName?: string;
  groupId?: number;
}


export interface ItemsInCartType {
  producItem: ProductItem;
  qty: number;
}