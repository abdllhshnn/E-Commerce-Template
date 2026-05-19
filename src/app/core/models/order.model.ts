export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'preparing'
  | 'shipped'
  | 'delivered'
  | 'cancelled';

export interface OrderItem {
  productId: number;
  name: string;
  image: string;
  quantity: number;
  price: number;
}

export interface OrderTimeline {
  status: OrderStatus;
  label: string;
  date: string | null;
  completed: boolean;
}

export interface Order {
  id: string;
  date: string;
  status: OrderStatus;
  items: OrderItem[];
  subtotal: number;
  shippingCost: number;
  total: number;
  shippingAddress: string;
  trackingNumber: string | null;
  timeline: OrderTimeline[];
}
