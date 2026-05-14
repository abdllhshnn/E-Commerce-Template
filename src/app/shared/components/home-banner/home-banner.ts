import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { ProductService } from '../../../core/services/product.service';
import { HeroBanner } from '../../../core/models/product.model';

@Component({
  selector: 'app-home-banner',
  imports: [RouterLink],
  templateUrl: './home-banner.html',
  styleUrl: './home-banner.scss',
})
export class HomeBanner {
  private productService = inject(ProductService);
  private banners = toSignal(this.productService.getHeroBanners(), { initialValue: [] });

  mainBanner = computed<HeroBanner | undefined>(() => this.banners()[0]);
  sideBanners = computed<HeroBanner[]>(() => this.banners().slice(1));
}
