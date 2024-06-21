import { Injectable } from '@angular/core';
import {
  Product,
  ProductItem,
  prodcutSearchParams,
} from '../components/shared/Models/productType';
import { productTypeEnums } from '../enums/productTypes';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {PRODUCTS} from '../../DATA'

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  getAllProducts(filter?: prodcutSearchParams) {
    return this.restructureproductsResponse(
      JSON.parse(JSON.stringify(PRODUCTS))
    );
  }

  show(id: number): Product {
    return PRODUCTS.filter((p) => p.id == id)[0];
  }

  getProductByProductItemSlug(slug: string): Product {
    return JSON.parse(JSON.stringify(PRODUCTS)).filter((p:Product) => p.items.filter((pi) => pi.slug == slug)[0])[0];
  }

  getItemBySlug(slug: string) {
    return PRODUCTS.flatMap((p) => p.items.filter((i) => i.slug === slug))[0];
  }

  search(filter: prodcutSearchParams, page = 1): Observable<Product[]> {
    let isFiltersNotEmpty = Boolean(
      filter?.category ||
        filter?.searchValue ||
        filter?.sellerId ||
        filter?.sellerName ||
        filter?.groupId ||
        filter?.groupName
    );
    let products = isFiltersNotEmpty
      ? PRODUCTS.filter((item) =>
          filter?.searchValue && filter?.sellerId && filter?.groupId
            ? item.name.includes(filter.searchValue) &&
              item.sellerId === filter.sellerId &&
              item.groupId === filter.groupId
            : (filter?.searchValue && item.name.includes(filter.searchValue)) ||
              (filter?.sellerId && item.sellerId === filter.sellerId) ||
              (filter?.groupId && item.groupId === filter.groupId)
        )
      : PRODUCTS;

    return of(products);
  }

  getItemSlugByItemId (id:number):string{
    return PRODUCTS.flatMap((p) => p.items.filter((i) => i.id === id))[0].slug;
  }

  private restructureproductsResponse(products: Product[]) {
    products.forEach((product) => {
      if (product.productType == productTypeEnums.CLOTHES) {
        product.availableColors = [];
        product.availableSizes = [];

        product.items.forEach((item, i) =>
          item.variations.forEach((v) => {
            if (v.key == 'color') {
              product?.availableColors?.push({
                img: item.images[0],
                itemsId: item.id,
                qty: item?.qty_in_stock,
                color: v.value,
              });
            }

            if (v.key == 'size') {
              let isSizeNotExists =
                product?.availableSizes?.findIndex((s) => s.size == v.value) ==
                -1;

              if (isSizeNotExists) {
                product?.availableSizes?.push({
                  itemsId: item.id,
                  qty: item?.qty_in_stock,
                  size: v.value,
                });
              }
            }
          })
        );
      }
    });

    return products;
  }

  getColorsAndSizesObjectFromProdouctItem(productItem:ProductItem){
    
    let isProductTypeColor = this.getProductByProductItemSlug(productItem.slug).productType == productTypeEnums.CLOTHES;
    if(isProductTypeColor) {
        let colors = productItem.variations.flatMap(v => {
          if (v.key == 'color') {
            return {
              img: productItem.images[0],
              itemsId: productItem.id,
              qty: productItem?.qty_in_stock,
              color: v.value,
            }
          } else return {}
        })

        let sizes = productItem.variations.flatMap(v => {
          if (v.key == 'size') {
            return {
              img: productItem.images[0],
              itemsId: productItem.id,
              qty: productItem?.qty_in_stock,
              size: v.value,
            }
          } else return {}
        })


       return {
        sizes,
        colors
       }
    }
    return null
  }

  
}
