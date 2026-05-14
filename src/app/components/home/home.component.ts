import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ProductService } from '../../core/services/product.service';
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
  private productService = inject(ProductService);

  popularProducts = toSignal(this.productService.getPopularProducts(8), { initialValue: [] });
  newProducts = toSignal(this.productService.getNewProducts(4), { initialValue: [] });
}
