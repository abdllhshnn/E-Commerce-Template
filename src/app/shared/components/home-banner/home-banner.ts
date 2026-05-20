import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngxs/store';
import { ProductState } from '../../../core/state/product.state';
import { LoadHeroBanners } from '../../../core/state/actions/product.actions';
import { HeroBanner } from '../../../core/models/product.model';

@Component({
  selector: 'app-home-banner',
  imports: [RouterLink],
  templateUrl: './home-banner.html',
  styleUrl: './home-banner.scss',
})
export class HomeBanner {
  private store = inject(Store);
  private banners = toSignal(this.store.select(ProductState.heroBanners), { initialValue: [] });

  mainBanner = computed<HeroBanner | undefined>(() => this.banners()[0]);
  sideBanners = computed<HeroBanner[]>(() => this.banners().slice(1));

  constructor() {
    this.store.dispatch(new LoadHeroBanners());
  }
}
