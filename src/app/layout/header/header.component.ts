import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngxs/store';
import { ProductState } from '../../core/state/product.state';
import { AuthState } from '../../core/state/auth.state';
import { LoadCategories } from '../../core/state/actions/product.actions';
import { Logout } from '../../core/state/actions/auth.actions';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  private store = inject(Store);

  categories = toSignal(this.store.select(ProductState.categories), { initialValue: [] });
  authState = toSignal(this.store.select(AuthState.authInfo), {
    initialValue: { user: null, isAuthenticated: false },
  });

  cartCount = 3;
  searchOpen = false;
  catOpen = false;
  userMenuOpen = false;

  constructor() {
    this.store.dispatch(new LoadCategories());
  }

  logout(): void {
    this.store.dispatch(new Logout());
    this.userMenuOpen = false;
  }
}
