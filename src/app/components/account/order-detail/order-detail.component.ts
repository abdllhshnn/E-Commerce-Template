import { Component, inject, input, effect } from '@angular/core';
import { RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { DecimalPipe } from '@angular/common';
import { Store } from '@ngxs/store';
import { OrderState } from '../../../core/state/order.state';
import { LoadOrderById } from '../../../core/state/actions/order.actions';

@Component({
  selector: 'app-order-detail',
  imports: [RouterLink, DecimalPipe],
  templateUrl: './order-detail.component.html',
  styleUrl: './order-detail.component.scss',
})
export class OrderDetailComponent {
  private store = inject(Store);

  id = input.required<string>();

  order = toSignal(this.store.select(OrderState.selectedOrder));

  constructor() {
    effect(() => {
      const id = this.id();
      if (id) {
        this.store.dispatch(new LoadOrderById(id));
      }
    });
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
