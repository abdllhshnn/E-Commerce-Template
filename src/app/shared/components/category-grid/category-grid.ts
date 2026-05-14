import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { ProductService } from '../../../core/services/product.service';

@Component({
  selector: 'app-category-grid',
  imports: [RouterLink],
  templateUrl: './category-grid.html',
  styleUrl: './category-grid.scss',
})
export class CategoryGrid {
  private productService = inject(ProductService);

  categories = toSignal(this.productService.getCategories(), { initialValue: [] });
}
