import { Component, inject, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { DatePipe, DecimalPipe } from '@angular/common';
import { Store } from '@ngxs/store';
import { OrderState } from '../../../core/state/order.state';
import { LoadOrders } from '../../../core/state/actions/order.actions';
import { OrderStatus } from '../../../core/models/order.model';

@Component({
  selector: 'app-orders',
  imports: [RouterLink, DatePipe, DecimalPipe],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss',
})
export class OrdersComponent {
  private store = inject(Store);

  orders = toSignal(this.store.select(OrderState.orders), { initialValue: [] });
  activeFilter = signal<OrderStatus | 'all'>('all');

  constructor() {
    this.store.dispatch(new LoadOrders());
  }

  filters: { label: string; value: OrderStatus | 'all' }[] = [
    { label: 'Tümü', value: 'all' },
    { label: 'Beklemede', value: 'pending' },
    { label: 'Onaylandı', value: 'confirmed' },
    { label: 'Hazırlanıyor', value: 'preparing' },
    { label: 'Kargoda', value: 'shipped' },
    { label: 'Teslim Edildi', value: 'delivered' },
    { label: 'İptal', value: 'cancelled' },
  ];

  filteredOrders = computed(() => {
    const filter = this.activeFilter();
    const all = this.orders();
    if (filter === 'all') return all;
    return all.filter((o) => o.status === filter);
  });

  setFilter(value: OrderStatus | 'all'): void {
    this.activeFilter.set(value);
  }

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
