export class LoadOrders {
  static readonly type = '[Order] Load Orders';
}

export class LoadOrderById {
  static readonly type = '[Order] Load Order By Id';
  constructor(public id: string) {}
}

export class LoadRecentOrders {
  static readonly type = '[Order] Load Recent Orders';
  constructor(public count: number) {}
}
