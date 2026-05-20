import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngxs/store';
import { ProductState } from '../../../core/state/product.state';
import { LoadPromoBanners } from '../../../core/state/actions/product.actions';

@Component({
  selector: 'app-promo-banners',
  imports: [RouterLink],
  templateUrl: './promo-banners.html',
  styleUrl: './promo-banners.scss',
})
export class PromoBanners {
  private store = inject(Store);

  banners = toSignal(this.store.select(ProductState.promoBanners), { initialValue: [] });

  constructor() {
    this.store.dispatch(new LoadPromoBanners());
  }
}
