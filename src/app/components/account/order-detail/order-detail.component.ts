import { Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { DecimalPipe } from '@angular/common';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';
import { OrderService } from '../../../core/services/order.service';

@Component({
  selector: 'app-order-detail',
  imports: [RouterLink, DecimalPipe],
  templateUrl: './order-detail.component.html',
  styleUrl: './order-detail.component.scss',
})
export class OrderDetailComponent {
  private orderService = inject(OrderService);

  id = input.required<string>();

  order = toSignal(
    toObservable(this.id).pipe(
      switchMap((id) => (id ? this.orderService.getOrderById(id) : of(undefined))),
    ),
  );

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
