import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngxs/store';
import { ProductState } from '../../core/state/product.state';
import { LoadCategories } from '../../core/state/actions/product.actions';

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  private store = inject(Store);

  categories = toSignal(this.store.select(ProductState.categories), { initialValue: [] });
  currentYear = new Date().getFullYear();

  constructor() {
    this.store.dispatch(new LoadCategories());
  }

  corporateLinks = [
    { label: 'Hakkımızda', route: '/about' },
    { label: 'Kariyer', route: '/careers' },
    { label: 'Blog', route: '/blog' },
    { label: 'Basın', route: '/press' },
  ];

  customerLinks = [
    { label: 'Sıkça Sorulan Sorular', route: '/faq' },
    { label: 'İade ve Değişim', route: '/returns' },
    { label: 'Kargo Bilgileri', route: '/shipping' },
    { label: 'Gizlilik Politikası', route: '/privacy' },
  ];
}
