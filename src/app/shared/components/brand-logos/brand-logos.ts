import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngxs/store';
import { ProductState } from '../../../core/state/product.state';
import { LoadBrands } from '../../../core/state/actions/product.actions';

@Component({
  selector: 'app-brand-logos',
  imports: [RouterLink],
  templateUrl: './brand-logos.html',
  styleUrl: './brand-logos.scss',
})
export class BrandLogos {
  private store = inject(Store);

  brands = toSignal(this.store.select(ProductState.brands), { initialValue: [] });

  constructor() {
    this.store.dispatch(new LoadBrands());
  }
}
