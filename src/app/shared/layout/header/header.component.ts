import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { ProductService } from '../../../core/services/product.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  private productService = inject(ProductService);

  categories = toSignal(this.productService.getCategories(), { initialValue: [] });
  cartCount = 3;
  searchOpen = false;
  catOpen = false;
}
