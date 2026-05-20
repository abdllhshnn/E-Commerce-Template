import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { DatePipe, DecimalPipe } from '@angular/common';
import { Store } from '@ngxs/store';
import { AuthState } from '../../../core/state/auth.state';
import { OrderState } from '../../../core/state/order.state';
import { LoadRecentOrders } from '../../../core/state/actions/order.actions';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink, DatePipe, DecimalPipe],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  private store = inject(Store);

  authState = toSignal(this.store.select(AuthState.authInfo), {
    initialValue: { user: null, isAuthenticated: false },
  });

  recentOrders = toSignal(this.store.select(OrderState.recentOrders), {
    initialValue: [],
  });

  constructor() {
    this.store.dispatch(new LoadRecentOrders(3));
  }

  get firstName(): string {
    return this.authState().user?.firstName ?? '';
  }

  quickLinks = [
    { icon: 'bi-box-seam', label: 'Siparişlerim', route: '/account/orders', color: '#4f46e5' },
    { icon: 'bi-geo-alt', label: 'Adreslerim', route: '/account/addresses', color: '#0ea5e9' },
    { icon: 'bi-heart', label: 'Favorilerim', route: '/account/favorites', color: '#ec4899' },
    { icon: 'bi-gear', label: 'Ayarlar', route: '/account/settings', color: '#f59e0b' },
  ];

  getStatusLabel(status: string): string {
    const map: Record<string, string> = {
      pending: 'Beklemede',
      confirmed: 'Onaylandı',
      preparing: 'Hazırlanıyor',
      shipped: 'Kargoda',
      delivered: 'Teslim Edildi',
      cancelled: 'İptal',
    };
    return map[status] ?? status;
  }

  getStatusClass(status: string): string {
    const map: Record<string, string> = {
      pending: 'bg-warning text-dark',
      confirmed: 'bg-info text-white',
      preparing: 'bg-primary',
      shipped: 'bg-info text-white',
      delivered: 'bg-success',
      cancelled: 'bg-danger',
    };
    return map[status] ?? 'bg-secondary';
  }
}
