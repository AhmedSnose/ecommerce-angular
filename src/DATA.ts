import {
  CartGroupType,
  GroupType,
  PaymentMethodType,
  ShippingMethodType,
} from './app/components/shared/Models/groupType';
import {
  Product,
  ProductItem,
} from './app/components/shared/Models/productType';
import { SellerType } from './app/components/shared/Models/sellerType';
import { productTypeEnums } from './app/enums/productTypes';

const addColorOrSizeIfExistInProducItem = (
  producItem: ProductItem
): ProductItem => {
  producItem.variations.forEach((v) => {
    if (v.key == 'color') producItem.color = v.value;

    if (v.key == 'size') producItem.size = v.value;
  });

  return producItem;
};

export const shippingMethods: ShippingMethodType[] = [
  {
    code: 'PICK_UP_ON_SELLER_PLCAE',
    name: 'Pick up on seller place',
    fees: 0,
    img: '/images/checkout/rop.png',
    place: 'https://maps.app.goo.gl/xeKoebkLYvH5UQMEA',
    description: 'Pick-Up',
  },
  {
    code: 'PICK_UP_ON_GROUP_PLCAE',
    name: 'Pick up on group place',
    fees: 200,
    img: '/images/checkout/truck.png',
    place: 'https://maps.app.goo.gl/xeKoebkLYvH5UQMEA',
    description: 'Pick-Up',
  },
  {
    code: 'DELIVERY',
    name: 'Delivery',
    fees: 400,
    img: '/images/checkout/delivery.png',
    place: null,
    description: 'Delivery At Your Default Address',
  },
];

export const paymentMethods: PaymentMethodType[] = [
  {
    fees: 30,
    code: 'PAYMENT_GATEWAY_CASH_ON_DELIVERY',
    name: 'Cash on delivery',
    img: '/images/checkout/cod.png',
    // description:'Pick-Up',
  },
  {
    fees: 34, // this will be rquest from backend
    code: 'PAYMENT_GATEWAY_VODAFONE_CASH',
    name: 'Vodafone Cash',
    img: '/images/checkout/vodafone.png',
    // description:'Pick-Up',
  },
];

const groupStatus = [
  { code: 'ACTIVE', name: 'Active' },
  { code: 'READY_FOR_DELIVERY', name: 'Ready For Delivery' },
  { code: 'ON_DELIVERY', name: 'on delivery' },
  { code: 'COMPLETED', name: 'completed' },
  { code: 'CANCELED', name: 'canceled' },
];

const deliveryPerson = [{ id: 1, name: 'Person' }];

const userAddresses = [
  {
    region: 'USA',
    name: 'AA AA AA',
    phone: '00201172837444',
    streetName: 'Talaat Harb',
    buildingName: 'Ex Fax',
    city: 'LA',
    district: '',
    governorate: '',
    nearestLandmark: '',
  },
  {
    region: 'USA',
    name: 'AA AA AA',
    phone: '00201172837444',
    streetName: 'Talaat Harb',
    buildingName: 'Ex Fax',
    city: 'LA',
    district: '',
    governorate: '',
    nearestLandmark: '',
  },
];

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'general T-Shirts',
    slug: 'general-T-Shirts',
    description: 'general',
    groupId: 2,
    sellerId: 1,
    category: {
      id: 1,
      parent_id: 1,
      name: 'clothes (T-Shirts)',
      description:
        'T-Shirts is the best , with different sizes parent name is clothes',
      img: '',
    },
    unit: 'piece',
    productType: productTypeEnums.CLOTHES,
    images: [''],
    items: [
      {
        title: 'S- L color black',
        id: 1,
        productId: 1,
        slug: 'slug-9',
        qty_in_stock: 20,
        images: [
          'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=1915&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        ],
        price: 15.99,
        variations: [
          {
            key: 'size',
            value: 'L',
          },
          {
            key: 'color',
            value: '#111111',
          },
        ],
      },
      {
        title: 'S- Xl color b6bfcf',
        slug: 'slug-10',
        id: 2,
        productId: 1,
        qty_in_stock: 50,
        images: [
          'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        ],
        price: 18.99,
        variations: [
          {
            key: 'size',
            value: 'XL',
          },
          {
            key: 'color',
            value: '#b6bfcf',
          },
        ],
      },
    ],
  },
  {
    id: 2,
    sellerId: 3,
    slug: 'tomatos',
    groupId: 2,
    category: {
      id: 3,
      parent_id: 2,
      name: 'vegetables',
      description:
        'vegetables - fruits (tomato) is the best , with different sizes parent is groceries',
      img: '',
    },
    productType: productTypeEnums.VEGETABLES,
    name: 'tomatos',
    description:
      'tomatos || Cherry tomato , Standard Globe , Beefsteak Tomatoes  , Roma Tomatoes',
    images: [''],
    unit: 'kg',
    items: [
      {
        title: 'EXD-2024-05-01 C-storage',
        id: 4,
        slug: 'slug-1',
        productId: 2,
        qty_in_stock: 80,
        images: [
          'https://www.liveeatlearn.com/wp-content/uploads/2022/08/cherry-tomato-768x512.jpg',
          'https://www.southernliving.com/thmb/DTkR8hvVNJYDDeooLS3sXh7xJ1E=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/GettyImages-836318970-2000-d652c21e6f5842d4a8e8b1329d04b987.jpg',
        ],
        price: 29.99,
        variations: [
          {
            key: 'expiration',
            value: '2024-05-01',
          },
          {
            key: 'condition',
            value: 'storage',
          },
        ],
      },
      {
        title: 'fresh - 2024-06-06',
        id: 5,
        slug: 'slug-2',
        productId: 2,
        qty_in_stock: 60,
        images: [
          'https://www.liveeatlearn.com/wp-content/uploads/2019/05/common-types-of-tomatoes-14-768x439.jpg',
        ],
        price: 34.99,
        variations: [
          {
            key: 'expiration',
            value: '2024-06-06',
          },
          {
            key: 'condition',
            value: 'fresh',
          },
        ],
      },
    ],
  },
  {
    id: 3,
    sellerId: 1,
    groupId: 2,
    category: {
      id: 4,
      parent_id: null,
      name: 'groceries (oils)',
      description:
        '(oil) is the best , with different sizes parent is groceries',
      img: '',
    },
    productType: productTypeEnums.GROCERIES,
    name: 'Cooking oil',
    slug: 'cooking-oil',
    description: 'Cooking oil || Olive , Avocado , Rice bran , Safflower',
    images: [''],
    unit: 'liter',
    items: [
      {
        id: 6,
        title: 'Liquid Olive Oil',
        productId: 3,
        slug: 'slug-3',
        qty_in_stock: 20,
        images: [
          'https://m.media-amazon.com/images/I/61oi+4QkJPL._AC_SL1500_.jpg',
        ],
        price: 29.99,
        variations: [
          {
            key: 'expiration',
            value: '2024-05-01',
          },
          {
            key: 'format',
            value: 'Liquid',
          },
          {
            key: 'Manufacturer',
            value: 'Atlas',
          },
          {
            key: 'Made in',
            value: 'Egypt',
          },
          {
            key: 'Flavor',
            value: 'Olive',
          },
          {
            key: 'Brand',
            value: 'Generic',
          },
        ],
      },
    ],
  },
  {
    id: 4,
    sellerId: 3,
    groupId: 1,
    category: {
      id: 5,
      parent_id: null,
      name: 'adidas Shoes',
      description:
        'adidas shoes is the best , with different sizes parent is adidas',
      img: '',
    },
    productType: productTypeEnums.CLOTHES,
    name: 'adidas shoes (Running)',
    slug: 'adidas-shoes-Running',
    description: 'adidas shoes (Running) || Black , White',
    unit: 'pair',
    images: [''],
    items: [
      {
        id: 7,
        qty_in_stock: 1,
        productId: 5,
        slug: 'slug-4',
        title: 'size 55 color black',
        images: [
          'https://m.media-amazon.com/images/I/61tbEu+o9eL._AC_SY575_.jpg',
        ],
        price: 49.99,
        variations: [
          {
            key: 'size',
            value: '55',
          },
          {
            key: 'color',
            value: '#333',
          },
        ],
      },
      {
        title: 'size 35 color white',
        id: 8,
        qty_in_stock: 5,
        slug: 'slug-5',
        productId: 5,
        images: [
          'https://m.media-amazon.com/images/I/61BwJvmam9L._AC_SY575_.jpg',
        ],
        price: 49.99,
        variations: [
          {
            key: 'size',
            value: '35',
          },
          {
            key: 'color',
            value: '#fff',
          },
        ],
      },
      {
        title: 'size 44 color a2252d',
        id: 9,
        qty_in_stock: 3,
        slug: 'slug-6',
        productId: 5,
        images: [
          'https://m.media-amazon.com/images/I/4182KiGxthL._AC_SX575_.jpg',
        ],
        price: 49.99,
        variations: [
          {
            key: 'size',
            value: '44',
          },
          {
            key: 'color',
            value: '#a2252d',
          },
        ],
      },
      {
        title: 'size 44 color 26324a',
        id: 10,
        qty_in_stock: 3,
        slug: 'slug-7',
        productId: 5,
        images: [
          'https://m.media-amazon.com/images/I/61Ioa0OfCAL._AC_SY695_.jpg',
        ],
        price: 49.99,
        variations: [
          {
            key: 'size',
            value: '44',
          },
          {
            key: 'color',
            value: '#26324a',
          },
        ],
      },
      {
        title: 'size 44 color a2a2a2',
        slug: 'slug-8',
        id: 11,
        qty_in_stock: 3,
        productId: 5,
        images: [
          'https://m.media-amazon.com/images/I/51EqFGZT6WL._AC_SY575_.jpg',
        ],
        price: 49.99,
        variations: [
          {
            key: 'size',
            value: '44',
          },
          {
            key: 'color',
            value: '#a2a2a2',
          },
        ],
      },
    ],
  },
];

export const GROUPS: GroupType[] = [
  {
    id: 3,
    name: 'Group 3',
    slug: 'group-3',
    images: [
      'https://images.unsplash.com/photo-1714676982703-0c51440c6c1a?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'group3_image2.jpg',
    ],
    maxSubscribers: 200,
    currentSubscribers: 150,
    description: 'Group 3 description',
    createdAt: '2024-05-04T12:00:00Z',
    startAt: '2024-05-20T12:00:00Z',
    endAt: '2024-05-30T12:00:00Z',
    addressId: 2,
    sellerId: 1,
    status: groupStatus[0].name,
    assignedDeliveryPerson: deliveryPerson[0].id,
    shippingMethods: shippingMethods,
    paymentMethods: paymentMethods,
    products: PRODUCTS,
  },
  {
    id: 2,
    name: 'Group 2',
    slug: 'group-2',
    images: [
      'https://images.unsplash.com/photo-1714676982703-0c51440c6c1a?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D  ',
      'group2_image2.jpg',
    ],
    status: groupStatus[2].name,
    maxSubscribers: 150,
    currentSubscribers: 100,
    description: 'Group 2 description',
    createdAt: '2024-05-04T12:00:00Z',
    startAt: '2024-05-15T12:00:00Z',
    endAt: '2024-05-25T12:00:00Z',
    addressId: 1,
    sellerId: 1,
    assignedDeliveryPerson: deliveryPerson[0].id,
    shippingMethods: shippingMethods,
    paymentMethods: paymentMethods,
    products: PRODUCTS.filter((p) => p.id == 1 || p.id == 2),
  },
  {
    id: 1,
    name: 'Group 1',
    slug: 'group-1',
    images: [
      'https://images.unsplash.com/photo-1714715529966-c9f079e3a3ad?q=80&w=1949&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'group1_image2.jpg',
    ],
    maxSubscribers: 100,
    currentSubscribers: 50,
    status: groupStatus[1].name,
    description: 'Group 1 description',
    createdAt: '2024-05-04T12:00:00Z',
    startAt: '2024-05-10T12:00:00Z',
    endAt: '2024-05-20T12:00:00Z',
    addressId: 3,
    sellerId: 3,
    assignedDeliveryPerson: deliveryPerson[0].id,
    shippingMethods: shippingMethods,
    paymentMethods: paymentMethods,
    products: PRODUCTS.filter((p) => p.id == 3 || p.id == 4),
  },
];

export const SELLERS: SellerType[] = [
  {
    sellerId: 1,
    rate: 3,
    desccription:
      'Writey A.I is an AI tool that generates original, researched blog posts in minutes, provides content optimization advice, and works with a plagiarism-free rule',
    createdAt: '2024-05-05',
    name: 'Islam Mostafa',
    slug: 'Islam-Mostafa',
    image:
      'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    personType: {
      type: 'seller',
      code: 'SELLER',
    },
    warehouse: [
      {
        groups: GROUPS,
        address: {
          id: 1,
          unit_number: '',
          street_number: '',
          address_line1: '',
          address_line2: '',
          city: '',
          region: '',
          postal_code: '',
          country_id: '',
        },
      },
    ],
    deliveryInformation: shippingMethods,
  },
  {
    sellerId: 3,
    rate: 4,
    desccription:
      'Writey A.I is an AI tool that generates original, researched blog posts in minutes, provides content optimization advice, and works with a plagiarism-free rule',
    createdAt: '2024-07-20',
    name: 'Emily Smith',
    slug: 'Emily-Smith',
    image: '',
    personType: {
      type: 'seller',
      code: 'SELLER',
    },
    warehouse: [
      {
        groups: GROUPS,
        address: {
          id: 3,
          unit_number: 'B2',
          street_number: '456',
          address_line1: 'Broadway',
          address_line2: 'Suite 202',
          city: 'Los Angeles',
          region: 'CA',
          postal_code: '90001',
          country_id: 'US',
        },
      },
    ],
    deliveryInformation: shippingMethods,
  },
  {
    sellerId: 4,
    rate: 7,
    desccription:
      'Writey A.I is an AI tool that generates original, researched blog posts in minutes, provides content optimization advice, and works with a plagiarism-free rule',
    createdAt: '2024-08-05',
    name: 'Sophia Johnson',
    slug: 'Sophia-Johnson',
    image: '',
    personType: {
      type: 'seller',
      code: 'SELLER',
    },
    warehouse: [
      {
        groups: GROUPS,
        address: {
          id: 4,
          unit_number: 'C3',
          street_number: '789',
          address_line1: 'Main Street',
          address_line2: 'Apt 301',
          city: 'Chicago',
          region: 'IL',
          postal_code: '60601',
          country_id: 'US',
        },
      },
    ],
    deliveryInformation: shippingMethods,
  },
];

export const GROUPS_IN_CART: CartGroupType[] = [
  // {
  //   id: 3,
  //   name: 'Group 3',
  //   slug: 'group-3',
  //   images: [
  //     'https://images.unsplash.com/photo-1714676982703-0c51440c6c1a?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  //     'group3_image2.jpg',
  //   ],
  //   maxSubscribers: 200,
  //   currentSubscribers: 150,
  //   description: 'Group 3 description',
  //   createdAt: '2024-05-04T12:00:00Z',
  //   startAt: '2024-05-20T12:00:00Z',
  //   endAt: '2024-05-30T12:00:00Z',
  //   sellerId: 1,
  //   addressId: 2,
  //   shippingMethods: shippingMethods,
  //   paymentMethods: paymentMethods,
  //   totalValue: 50.99,
  //   products: PRODUCTS.filter((p) => p.id == 3 || p.id == 4),
  //   itemsInCart: PRODUCTS.flatMap((p, i) => {
  //     return p.items.flatMap((pi) => {
  //       return {
  //         producItem: addColorOrSizeIfExistInProducItem(pi),
  //         qty: (i % 2) + 1,
  //       };
  //     });
  //   }),
  // },
  // {
  //   id: 2,
  //   name: 'Group 2',
  //   slug: 'group-2',
  //   images: [
  //     'https://images.unsplash.com/photo-1714676982703-0c51440c6c1a?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D  ',
  //     'group2_image2.jpg',
  //   ],
  //   maxSubscribers: 150,
  //   currentSubscribers: 100,
  //   description: 'Group 2 description',
  //   createdAt: '2024-05-04T12:00:00Z',
  //   startAt: '2024-05-15T12:00:00Z',
  //   endAt: '2024-05-25T12:00:00Z',
  //   sellerId: 1,
  //   addressId: 1,
  //   shippingMethods: shippingMethods,
  //   paymentMethods: paymentMethods,
  //   products: PRODUCTS.filter((p) => p.id == 1 || p.id == 2),
  //   totalValue: 200,
  //   itemsInCart: PRODUCTS.flatMap((p, i) =>
  //     p.id == 1 || p.id == 2
  //       ? p.items.flatMap((pi) => {
  //           return {
  //             producItem: addColorOrSizeIfExistInProducItem(pi),
  //             qty: (i % 2) + 1,
  //           };
  //         })
  //       : []
  //   ),
  // },

  // {
  //   id: 3,
  //   name: 'Group 3',
  //   slug: 'group-3',
  //   images: [
  //     'https://images.unsplash.com/photo-1714676982703-0c51440c6c1a?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  //     'group3_image2.jpg',
  //   ],
  //   maxSubscribers: 200,
  //   currentSubscribers: 150,
  //   description: 'Group 3 description',
  //   createdAt: '2024-05-04T12:00:00Z',
  //   startAt: '2024-05-20T12:00:00Z',
  //   endAt: '2024-05-30T12:00:00Z',
  //   seller: SELLERS[0],
  //   shippingMethods: shippingMethods,
  //   paymentMethods: paymentMethods,
  //   products: PRODUCTS,
  //   itemsInCart: [
  //     {
  //       sellerInfo: SELLERS[0],
  //       producItem: {
  //         title: 'S- L color black',
  //         id: 1,
  //         productId: 1,
  //         slug: 'slug-9',
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
  //       qty: 1,
  //     },
  //   ],
  //   totalValue: 0,
  // },
  // {
  //   id: 2,
  //   name: 'Group 2',
  //   slug: 'group-2',
  //   images: [
  //     'https://images.unsplash.com/photo-1714676982703-0c51440c6c1a?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  //     'group3_image2.jpg',
  //   ],
  //   maxSubscribers: 200,
  //   currentSubscribers: 150,
  //   description: 'Group 3 description',
  //   createdAt: '2024-05-04T12:00:00Z',
  //   startAt: '2024-05-20T12:00:00Z',
  //   endAt: '2024-05-30T12:00:00Z',
  //   seller: SELLERS[0],
  //   shippingMethods: shippingMethods,
  //   paymentMethods: paymentMethods,
  //   products: PRODUCTS,
  //   itemsInCart: [
  //     {
  //       sellerInfo: SELLERS[0],
  //       producItem: {
  //         id: 6,
  //         title: 'Liquid Olive Oil',
  //         productId: 3,
  //         slug: 'slug-3',
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
  //       qty: 3,
  //     },
  //   ],
  //   totalValue: 100,
  // },
];
// export const GROUPS_IN_CART: CartGroupType[] = [];

export interface SliderDataIF{
  img: string;
  title: string;
  description: string;
  buttonName?: string;
  buttonUrl?: string;
}
export const slidersData:SliderDataIF[] = [
  {
    buttonName: 'see more',
    buttonUrl: '#',
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry s standard dummy text ever since the 1500s ',
    img: 'swiper/home/1.avif',
    title: 'Slide one',
  },
  {
    buttonName: 'see more',
    buttonUrl: '#',
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry s standard dummy text ever since the 1500s ',
    img: 'swiper/home/2.avif',
    title: 'Slide two',
  },
  {
    buttonName: 'see more',
    buttonUrl: '#',
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry s standard dummy text ever since the 1500s ',
    img: 'swiper/home/3.avif',
    title: 'Slide three',
  }
];

interface FAQDataIF {
  question:string;
  answer:string
}
export const FAQData:FAQDataIF[] = [
  {
    question:'What could possibly be your first question?',
    answer:'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione. Lorem ipsum, dolor sit amet consectetur adipisicing elit.'
  },
  {
    question:'What could possibly be your first question?',
    answer:'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione. Lorem ipsum, dolor sit amet consectetur adipisicing elit.'
  },
  {
    question:'What could possibly be your first question?',
    answer:'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione. Lorem ipsum, dolor sit amet consectetur adipisicing elit.'
  }
] 
