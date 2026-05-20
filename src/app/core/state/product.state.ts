import { Injectable, inject } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { ProductService } from '../services/product.service';
import { Product, Category, HeroBanner, PromoBanner, Brand } from '../models/product.model';
import {
  LoadPopularProducts, LoadNewProducts, LoadCategories,
  LoadHeroBanners, LoadPromoBanners, LoadBrands, LoadAllProducts,
} from './actions/product.actions';

export interface ProductStateModel {
  products: Product[];
  popularProducts: Product[];
  newProducts: Product[];
  categories: Category[];
  heroBanners: HeroBanner[];
  promoBanners: PromoBanner[];
  brands: Brand[];
}

const defaults: ProductStateModel = {
  products: [],
  popularProducts: [],
  newProducts: [],
  categories: [],
  heroBanners: [],
  promoBanners: [],
  brands: [],
};

@State<ProductStateModel>({
  name: 'product',
  defaults,
})
@Injectable()
export class ProductState {
  private productService = inject(ProductService);

  @Selector()
  static products(state: ProductStateModel): Product[] {
    return state.products;
  }

  @Selector()
  static popularProducts(state: ProductStateModel): Product[] {
    return state.popularProducts;
  }

  @Selector()
  static newProducts(state: ProductStateModel): Product[] {
    return state.newProducts;
  }

  @Selector()
  static categories(state: ProductStateModel): Category[] {
    return state.categories;
  }

  @Selector()
  static heroBanners(state: ProductStateModel): HeroBanner[] {
    return state.heroBanners;
  }

  @Selector()
  static promoBanners(state: ProductStateModel): PromoBanner[] {
    return state.promoBanners;
  }

  @Selector()
  static brands(state: ProductStateModel): Brand[] {
    return state.brands;
  }

  @Action(LoadAllProducts)
  loadAllProducts(ctx: StateContext<ProductStateModel>) {
    return this.productService.getProducts().pipe(
      tap((products) => ctx.patchState({ products })),
    );
  }

  @Action(LoadPopularProducts)
  loadPopularProducts(ctx: StateContext<ProductStateModel>, action: LoadPopularProducts) {
    return this.productService.getPopularProducts(action.count).pipe(
      tap((popularProducts) => ctx.patchState({ popularProducts })),
    );
  }

  @Action(LoadNewProducts)
  loadNewProducts(ctx: StateContext<ProductStateModel>, action: LoadNewProducts) {
    return this.productService.getNewProducts(action.count).pipe(
      tap((newProducts) => ctx.patchState({ newProducts })),
    );
  }

  @Action(LoadCategories)
  loadCategories(ctx: StateContext<ProductStateModel>) {
    if (ctx.getState().categories.length > 0) return;
    return this.productService.getCategories().pipe(
      tap((categories) => ctx.patchState({ categories })),
    );
  }

  @Action(LoadHeroBanners)
  loadHeroBanners(ctx: StateContext<ProductStateModel>) {
    if (ctx.getState().heroBanners.length > 0) return;
    return this.productService.getHeroBanners().pipe(
      tap((heroBanners) => ctx.patchState({ heroBanners })),
    );
  }

  @Action(LoadPromoBanners)
  loadPromoBanners(ctx: StateContext<ProductStateModel>) {
    if (ctx.getState().promoBanners.length > 0) return;
    return this.productService.getPromoBanners().pipe(
      tap((promoBanners) => ctx.patchState({ promoBanners })),
    );
  }

  @Action(LoadBrands)
  loadBrands(ctx: StateContext<ProductStateModel>) {
    if (ctx.getState().brands.length > 0) return;
    return this.productService.getBrands().pipe(
      tap((brands) => ctx.patchState({ brands })),
    );
  }
}
