import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { ProductService } from '../../core/services/product.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  private productService = inject(ProductService);
  private authService = inject(AuthService);

  categories = toSignal(this.productService.getCategories(), { initialValue: [] });
  authState = toSignal(this.authService.state$, { initialValue: this.authService.snapshot });

  cartCount = 3;
  searchOpen = false;
  catOpen = false;
  userMenuOpen = false;

  logout(): void {
    this.authService.logout();
    this.userMenuOpen = false;
  }
}
