import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngxs/store';
import { ProductState } from '../../../core/state/product.state';
import { LoadCategories } from '../../../core/state/actions/product.actions';

@Component({
  selector: 'app-category-grid',
  imports: [RouterLink],
  templateUrl: './category-grid.html',
  styleUrl: './category-grid.scss',
})
export class CategoryGrid {
  private store = inject(Store);

  categories = toSignal(this.store.select(ProductState.categories), { initialValue: [] });

  constructor() {
    this.store.dispatch(new LoadCategories());
  }
}
