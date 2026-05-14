import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product, Category, HeroBanner, PromoBanner, Brand } from '../models/product.model';
import { MOCK_PRODUCTS, MOCK_CATEGORIES, MOCK_HERO_BANNERS, MOCK_PROMO_BANNERS, MOCK_BRANDS } from '../data/mock-products';

@Injectable({ providedIn: 'root' })
export class ProductService {

  getProducts(): Observable<Product[]> {
    return of(MOCK_PRODUCTS);
  }

  getPopularProducts(count: number): Observable<Product[]> {
    const sorted = [...MOCK_PRODUCTS].sort((a, b) => b.reviewCount - a.reviewCount);
    return of(sorted.slice(0, count));
  }

  getNewProducts(count: number): Observable<Product[]> {
    const newProducts = MOCK_PRODUCTS.filter(p => p.badge === 'new');
    return of(newProducts.slice(0, count));
  }

  getCategories(): Observable<Category[]> {
    return of(MOCK_CATEGORIES);
  }

  getHeroBanners(): Observable<HeroBanner[]> {
    return of(MOCK_HERO_BANNERS);
  }

  getPromoBanners(): Observable<PromoBanner[]> {
    return of(MOCK_PROMO_BANNERS);
  }

  getBrands(): Observable<Brand[]> {
    return of(MOCK_BRANDS);
  }
}
