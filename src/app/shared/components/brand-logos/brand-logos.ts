import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { ProductService } from '../../../core/services/product.service';

@Component({
  selector: 'app-brand-logos',
  imports: [RouterLink],
  templateUrl: './brand-logos.html',
  styleUrl: './brand-logos.scss',
})
export class BrandLogos {
  private productService = inject(ProductService);

  brands = toSignal(this.productService.getBrands(), { initialValue: [] });
}
