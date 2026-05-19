import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Order } from '../models/order.model';
import { MOCK_ORDERS } from '../data/mock-orders';

@Injectable({ providedIn: 'root' })
export class OrderService {
  getOrders(): Observable<Order[]> {
    return of(MOCK_ORDERS).pipe(delay(300));
  }

  getOrderById(id: string): Observable<Order | undefined> {
    const order = MOCK_ORDERS.find((o) => o.id === id);
    return of(order).pipe(delay(300));
  }

  getRecentOrders(count: number = 3): Observable<Order[]> {
    const sorted = [...MOCK_ORDERS].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );
    return of(sorted.slice(0, count)).pipe(delay(300));
  }
}
