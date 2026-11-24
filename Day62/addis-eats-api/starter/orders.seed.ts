import { Order } from '../src/orders/interfaces/order.interface';

export const orders: Order[] = [
  {
    id: 1,
    customerId: 1,
    courierId: 5,
    restaurantId: 10,
    status: 'PENDING',
    total: 350,
  },
  {
    id: 2,
    customerId: 2,
    courierId: 5,
    restaurantId: 10,
    status: 'ON_THE_WAY',
    total: 400,
  },
  {
    id: 3,
    customerId: 1,
    courierId: 6,
    restaurantId: 11,
    status: 'DELIVERED',
    total: 250,
  },
  {
    id: 4,
    customerId: 2,
    courierId: 6,
    restaurantId: 11,
    status: 'PREPARING',
    total: 220,
  },
];
