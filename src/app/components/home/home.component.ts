import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../core/services/product.service';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';

@Component({
  selector: 'app-home',
  imports: [RouterLink, ProductCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  private productService = inject(ProductService);

  slides = toSignal(this.productService.getCarouselSlides(), { initialValue: [] });
  categories = toSignal(this.productService.getCategories(), { initialValue: [] });
  popularProducts = toSignal(this.productService.getPopularProducts(8), { initialValue: [] });
  newProducts = toSignal(this.productService.getNewProducts(4), { initialValue: [] });
}
