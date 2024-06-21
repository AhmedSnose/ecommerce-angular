import {
  Category,
  // PRODUCTS,
  Product,
  ProductItem,
  Variation,
} from './productType';
import { SellerType } from './sellerType';

export interface ShippingMethodType {
  code: string;
  name: string;
  fees: number | string;
  img: string;
  place:string|null,
  description:string
}

export interface PaymentMethodType {
  code: string;
  name: string;
  fees: number | string;
  img: string;
  description?:string
}

export interface CartGroupType {
  id: number;
  name: string;
  slug: string;
  images: string[];
  maxSubscribers: number;
  currentSubscribers: number;
  description: string;
  createdAt: string;
  startAt: string;
  endAt: string;
  sellerId: number;
  seller?: SellerType;
  shippingMethods: ShippingMethodType[];
  paymentMethods: PaymentMethodType[];
  products: Product[];
  status?: string;
  itemsInCart: {
    producItem: ProductItem;
    qty: number;
    // sellerInfo:SellerType
  }[];
  totalValue: number;
  addressId:number
}

export interface GroupType {
  id: number;
  name: string;
  images: string[];
  slug: string;
  maxSubscribers: number;
  currentSubscribers: number;
  description: string;
  createdAt: string;
  startAt: string;
  status?: string;
  assignedDeliveryPerson?: string | number;
  endAt: string;
  sellerId?: number;
  shippingMethods: ShippingMethodType[];
  paymentMethods: PaymentMethodType[];
  products: Product[];
  seller?: SellerType;
  addressId:number
}

// export const shippingMethods: ShippingMethodType[] = [
//   { id: '1', name: 'Standard Shipping', price: 5.99 },
//   { id: '2', name: 'Express Shipping', price: 12.99 },
// ];

// export const paymentMethods: PaymentMethodType[] = [
//   { id: '1', name: 'Credit Card' },
//   { id: '2', name: 'PayPal' },
// ];

// const products: Product[] = PRODUCTS;

// export const GROUPS: GroupType[] = [
//   {
//     id: 3,
//     name: 'Group 3',
//     slug: 'group-3',
//     images: [
//       'https://images.unsplash.com/photo-1714676982703-0c51440c6c1a?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
//       'group3_image2.jpg',
//     ],
//     maxSubscribers: 200,
//     currentSubscribers: 150,
//     description: 'Group 3 description',
//     createdAt: '2024-05-04T12:00:00Z',
//     startAt: '2024-05-20T12:00:00Z',
//     endAt: '2024-05-30T12:00:00Z',
//     sellerId: 1,
//     shippingMethods: shippingMethods,
//     paymentMethods: paymentMethods,
//     products: products,
//   },
//   {
//     id: 2,
//     name: 'Group 2',
//     slug: 'group-2',
//     images: [
//       'https://images.unsplash.com/photo-1714676982703-0c51440c6c1a?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D  ',
//       'group2_image2.jpg',
//     ],
//     maxSubscribers: 150,
//     currentSubscribers: 100,
//     description: 'Group 2 description',
//     createdAt: '2024-05-04T12:00:00Z',
//     startAt: '2024-05-15T12:00:00Z',
//     endAt: '2024-05-25T12:00:00Z',
//     sellerId: 1,
//     shippingMethods: shippingMethods,
//     paymentMethods: paymentMethods,
//     products: products,
//   },
//   {
//     id: 1,
//     name: 'Group 1',
//     slug: 'group-1',
//     images: [
//       'https://images.unsplash.com/photo-1714715529966-c9f079e3a3ad?q=80&w=1949&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
//       'group1_image2.jpg',
//     ],
//     maxSubscribers: 100,
//     currentSubscribers: 50,
//     description: 'Group 1 description',
//     createdAt: '2024-05-04T12:00:00Z',
//     startAt: '2024-05-10T12:00:00Z',
//     endAt: '2024-05-20T12:00:00Z',
//     sellerId: 3,
//     shippingMethods: shippingMethods,
//     paymentMethods: paymentMethods,
//     products: products,
//   },
// ];

// export const SELLERS: SellerType[] = [
//   {
//     sellerId: 1,
//     rate: 3,
//     desccription:
//       'Writey A.I is an AI tool that generates original, researched blog posts in minutes, provides content optimization advice, and works with a plagiarism-free rule',
//     createdAt: '2024-05-05',
//     name: 'Islam Mostafa',
//     slug: 'Islam-Mostafa',
//     image:
//       'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
//     personType: {
//       type: 'seller',
//       code: 'SELLER',
//     },
//     warehouse: [
//       {
//         groups: GROUPS,
//         address: {
//           id: 1,
//           unit_number: '',
//           street_number: '',
//           address_line1: '',
//           address_line2: '',
//           city: '',
//           region: '',
//           postal_code: '',
//           country_id: '',
//         },
//       },
//     ],
//     deliveryInformation: {
//       description: '',
//       address: {
//         id: 1,
//         unit_number: '',
//         street_number: '',
//         address_line1: '',
//         address_line2: '',
//         city: '',
//         region: '',
//         postal_code: '',
//         country_id: '',
//       },
//       deliveryOnPlace: true,
//     },
//   },
//   {
//     sellerId: 3,
//     rate: 4,
//     desccription:
//       'Writey A.I is an AI tool that generates original, researched blog posts in minutes, provides content optimization advice, and works with a plagiarism-free rule',
//     createdAt: '2024-07-20',
//     name: 'Emily Smith',
//     slug: 'Emily-Smith',
//     image: 'https://example.com/emily-smith.jpg',
//     personType: {
//       type: 'seller',
//       code: 'SELLER',
//     },
//     warehouse: [
//       {
//         groups: GROUPS,
//         address: {
//           id: 3,
//           unit_number: 'B2',
//           street_number: '456',
//           address_line1: 'Broadway',
//           address_line2: 'Suite 202',
//           city: 'Los Angeles',
//           region: 'CA',
//           postal_code: '90001',
//           country_id: 'US',
//         },
//       },
//     ],
//     deliveryInformation: {
//       description: 'Leave package at the front desk',
//       address: {
//         id: 3,
//         unit_number: 'B2',
//         street_number: '456',
//         address_line1: 'Broadway',
//         address_line2: 'Suite 202',
//         city: 'Los Angeles',
//         region: 'CA',
//         postal_code: '90001',
//         country_id: 'US',
//       },
//       deliveryOnPlace: true,
//     },
//   },
//   {
//     sellerId: 4,
//     rate: 7,
//     desccription:
//       'Writey A.I is an AI tool that generates original, researched blog posts in minutes, provides content optimization advice, and works with a plagiarism-free rule',
//     createdAt: '2024-08-05',
//     name: 'Sophia Johnson',
//     slug: 'Sophia-Johnson',
//     image: 'https://example.com/sophia-johnson.jpg',
//     personType: {
//       type: 'seller',
//       code: 'SELLER',
//     },
//     warehouse: [
//       {
//         groups: GROUPS,
//         address: {
//           id: 4,
//           unit_number: 'C3',
//           street_number: '789',
//           address_line1: 'Main Street',
//           address_line2: 'Apt 301',
//           city: 'Chicago',
//           region: 'IL',
//           postal_code: '60601',
//           country_id: 'US',
//         },
//       },
//     ],
//     deliveryInformation: {
//       description: 'Call upon arrival',
//       address: {
//         id: 4,
//         unit_number: 'C3',
//         street_number: '789',
//         address_line1: 'Main Street',
//         address_line2: 'Apt 301',
//         city: 'Chicago',
//         region: 'IL',
//         postal_code: '60601',
//         country_id: 'US',
//       },
//       deliveryOnPlace: false,
//     },
//   },
// ];

export interface GroupSearchParams {
  searchValue?: string;
  category?: string;
  sellerId?: number;
  sellerName?: string | null;
}
