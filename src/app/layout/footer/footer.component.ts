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
