import { Component, input, output, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DecimalPipe } from '@angular/common';
import { Product } from '../../../core/models/product.model';

@Component({
  selector: 'app-product-card',
  imports: [RouterLink, DecimalPipe],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
})
export class ProductCardComponent {
  product = input.required<Product>();
  favoriteToggled = output<number>();

  isFavorite = signal(false);

  toggleFavorite(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.isFavorite.update(v => !v);
    this.favoriteToggled.emit(this.product().id);
  }

  getStars(): boolean[] {
    const rating = this.product().rating;
    return Array.from({ length: 5 }, (_, i) => i < Math.round(rating));
  }
}
