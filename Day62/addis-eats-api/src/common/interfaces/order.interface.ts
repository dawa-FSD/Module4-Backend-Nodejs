export type OrderStatus =
  'PENDING' | 'PREPARING' | 'ON_THE_WAY' | 'DELIVERED' | 'CANCELLED';

export interface Order {
  id: number;
  customerId: number;
  courierId: number;
  restaurantId: number;
  status: OrderStatus;
  total: number;
}
