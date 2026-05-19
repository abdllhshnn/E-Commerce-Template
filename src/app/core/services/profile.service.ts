import { Injectable, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { ProductService } from './product.service';
import { Product } from '../models/product.model';
import { MOCK_FAVORITE_IDS } from '../data/mock-favorites';

@Injectable({ providedIn: 'root' })
export class ProfileService {
  private authService = inject(AuthService);
  private productService = inject(ProductService);
  private favoriteIds = [...MOCK_FAVORITE_IDS];

  updateProfile(data: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  }): Observable<{ success: boolean; message: string }> {
    return of({
      success: true,
      message: 'Profil bilgileriniz güncellendi.',
    }).pipe(delay(600));
  }

  changePassword(data: {
    currentPassword: string;
    newPassword: string;
  }): Observable<{ success: boolean; message: string }> {
    return of({
      success: true,
      message: 'Şifreniz başarıyla güncellendi.',
    }).pipe(delay(600));
  }

  getFavorites(): Observable<Product[]> {
    return new Observable<Product[]>((subscriber) => {
      this.productService.getProducts().subscribe((products) => {
        const favorites = products.filter((p) =>
          this.favoriteIds.includes(p.id),
        );
        subscriber.next(favorites);
        subscriber.complete();
      });
    });
  }

  toggleFavorite(productId: number): void {
    const index = this.favoriteIds.indexOf(productId);
    if (index > -1) {
      this.favoriteIds.splice(index, 1);
    } else {
      this.favoriteIds.push(productId);
    }
  }

  isFavorite(productId: number): boolean {
    return this.favoriteIds.includes(productId);
  }
}
