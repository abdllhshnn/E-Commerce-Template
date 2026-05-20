import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngxs/store';
import { ProductState } from '../../core/state/product.state';
import { LoadPopularProducts, LoadNewProducts } from '../../core/state/actions/product.actions';
import { HomeBanner } from '../../shared/components/home-banner/home-banner';
import { CategoryGrid } from '../../shared/components/category-grid/category-grid';
import { ProductSection } from '../../shared/components/product-section/product-section';
import { PromoBanners } from '../../shared/components/promo-banners/promo-banners';
import { BrandLogos } from '../../shared/components/brand-logos/brand-logos';

@Component({
  selector: 'app-home',
  imports: [HomeBanner, CategoryGrid, ProductSection, PromoBanners, BrandLogos],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  private store = inject(Store);

  popularProducts = toSignal(this.store.select(ProductState.popularProducts), { initialValue: [] });
  newProducts = toSignal(this.store.select(ProductState.newProducts), { initialValue: [] });

  constructor() {
    this.store.dispatch(new LoadPopularProducts(8));
    this.store.dispatch(new LoadNewProducts(4));
  }
}
