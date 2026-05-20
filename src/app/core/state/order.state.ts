import { Injectable, inject } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { OrderService } from '../services/order.service';
import { Order } from '../models/order.model';
import { LoadOrders, LoadOrderById, LoadRecentOrders } from './actions/order.actions';

export interface OrderStateModel {
  orders: Order[];
  recentOrders: Order[];
  selectedOrder: Order | undefined;
  loading: boolean;
}

const defaults: OrderStateModel = {
  orders: [],
  recentOrders: [],
  selectedOrder: undefined,
  loading: false,
};

@State<OrderStateModel>({
  name: 'order',
  defaults,
})
@Injectable()
export class OrderState {
  private orderService = inject(OrderService);

  @Selector()
  static orders(state: OrderStateModel): Order[] {
    return state.orders;
  }

  @Selector()
  static recentOrders(state: OrderStateModel): Order[] {
    return state.recentOrders;
  }

  @Selector()
  static selectedOrder(state: OrderStateModel): Order | undefined {
    return state.selectedOrder;
  }

  @Selector()
  static loading(state: OrderStateModel): boolean {
    return state.loading;
  }

  @Action(LoadOrders)
  loadOrders(ctx: StateContext<OrderStateModel>) {
    ctx.patchState({ loading: true });
    return this.orderService.getOrders().pipe(
      tap((orders) => ctx.patchState({ orders, loading: false })),
    );
  }

  @Action(LoadOrderById)
  loadOrderById(ctx: StateContext<OrderStateModel>, action: LoadOrderById) {
    ctx.patchState({ loading: true, selectedOrder: undefined });
    return this.orderService.getOrderById(action.id).pipe(
      tap((selectedOrder) => ctx.patchState({ selectedOrder, loading: false })),
    );
  }

  @Action(LoadRecentOrders)
  loadRecentOrders(ctx: StateContext<OrderStateModel>, action: LoadRecentOrders) {
    return this.orderService.getRecentOrders(action.count).pipe(
      tap((recentOrders) => ctx.patchState({ recentOrders })),
    );
  }
}
