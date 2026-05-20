import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngxs/store';
import { ProfileState } from '../../../core/state/profile.state';
import { LoadFavorites, ToggleFavorite } from '../../../core/state/actions/profile.actions';
import { ProductCardComponent } from '../../../shared/components/product-card/product-card.component';

@Component({
  selector: 'app-favorites',
  imports: [ProductCardComponent],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss',
})
export class FavoritesComponent {
  private store = inject(Store);

  favorites = toSignal(this.store.select(ProfileState.favorites), {
    initialValue: [],
  });

  constructor() {
    this.store.dispatch(new LoadFavorites());
  }

  onFavoriteToggled(productId: number): void {
    this.store.dispatch(new ToggleFavorite(productId));
  }
}
