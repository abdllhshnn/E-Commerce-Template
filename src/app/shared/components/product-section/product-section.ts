import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '../../../core/models/product.model';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
  selector: 'app-product-section',
  imports: [RouterLink, ProductCardComponent],
  templateUrl: './product-section.html',
  styleUrl: './product-section.scss',
})
export class ProductSection {
  title = input.required<string>();
  products = input.required<Product[]>();
  linkText = input('Tümünü Gör');
  linkUrl = input('/urunler');
  bgClass = input('');
}
