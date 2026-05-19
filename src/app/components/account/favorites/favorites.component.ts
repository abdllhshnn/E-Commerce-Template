import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ProfileService } from '../../../core/services/profile.service';
import { ProductCardComponent } from '../../../shared/components/product-card/product-card.component';

@Component({
  selector: 'app-favorites',
  imports: [ProductCardComponent],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss',
})
export class FavoritesComponent {
  private profileService = inject(ProfileService);

  favorites = toSignal(this.profileService.getFavorites(), {
    initialValue: [],
  });

  onFavoriteToggled(productId: number): void {
    this.profileService.toggleFavorite(productId);
  }
}
