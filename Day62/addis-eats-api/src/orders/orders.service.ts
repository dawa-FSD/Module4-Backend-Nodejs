import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';

import { Order, OrderStatus } from './interfaces/order.interface';

import { AuthUser } from '../common/interfaces/auth-user.interface';

@Injectable()
export class OrdersService {
  private readonly orders: Order[] = [
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

  async findOne(id: number): Promise<Order> {
    const order = this.orders.find((item) => item.id === id);

    if (!order) {
      throw new NotFoundException(`Order ${id} not found`);
    }

    return order;
  }

  async findAllForUser(user: AuthUser): Promise<Order[]> {
    if (user.roles.includes('staff')) {
      return this.orders;
    }

    return this.orders.filter((order) => {
      const isCustomerOrder =
        user.roles.includes('customer') && order.customerId === user.id;

      const isCourierOrder =
        user.roles.includes('courier') && order.courierId === user.id;

      return isCustomerOrder || isCourierOrder;
    });
  }

  async cancelLoaded(order: Order): Promise<Order> {
    if (order.status !== 'PENDING') {
      throw new ConflictException('Only pending orders can be cancelled');
    }

    order.status = 'CANCELLED';

    return order;
  }

  async updateLoadedStatus(order: Order, status: OrderStatus): Promise<Order> {
    const allowedTransitions: Record<OrderStatus, OrderStatus[]> = {
      PENDING: ['PREPARING'],
      PREPARING: ['ON_THE_WAY'],
      ON_THE_WAY: ['DELIVERED'],
      DELIVERED: [],
      CANCELLED: [],
    };

    if (!allowedTransitions[order.status].includes(status)) {
      throw new ConflictException(
        `Cannot move from ${order.status} to ${status}`,
      );
    }

    order.status = status;

    return order;
  }
}
