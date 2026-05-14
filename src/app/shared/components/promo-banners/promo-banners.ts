import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { ProductService } from '../../../core/services/product.service';

@Component({
  selector: 'app-promo-banners',
  imports: [RouterLink],
  templateUrl: './promo-banners.html',
  styleUrl: './promo-banners.scss',
})
export class PromoBanners {
  private productService = inject(ProductService);

  banners = toSignal(this.productService.getPromoBanners(), { initialValue: [] });
}
