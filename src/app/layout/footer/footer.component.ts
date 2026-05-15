import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { ProductService } from '../../core/services/product.service';

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  private productService = inject(ProductService);

  categories = toSignal(this.productService.getCategories(), { initialValue: [] });
  currentYear = new Date().getFullYear();

  corporateLinks = [
    { label: 'Hakkımızda', route: '/hakkimizda' },
    { label: 'Kariyer', route: '/kariyer' },
    { label: 'Blog', route: '/blog' },
    { label: 'Basın', route: '/basin' },
  ];

  customerLinks = [
    { label: 'Sıkça Sorulan Sorular', route: '/sss' },
    { label: 'İade ve Değişim', route: '/iade' },
    { label: 'Kargo Bilgileri', route: '/kargo' },
    { label: 'Gizlilik Politikası', route: '/gizlilik' },
  ];
}
