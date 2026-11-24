import { Injectable } from '@nestjs/common';

import { AuthUser } from '../interfaces/auth-user.interface';

import { Order } from '../../orders/interfaces/order.interface';

export type OrderAction = 'read' | 'cancel' | 'updateStatus';

@Injectable()
export class OrderPolicy {
  can(user: AuthUser, action: OrderAction, order: Order): boolean {
    // Rule 1: Staff can access any order.
    if (user.roles.includes('staff')) {
      return true;
    }

    switch (action) {
      // Rule 2: Customer reads own order.
      case 'read':
        return (
          (user.roles.includes('customer') && order.customerId === user.id) ||
          (user.roles.includes('courier') && order.courierId === user.id)
        );

      // Rule 3: Customer cancels own pending order.
      case 'cancel':
        return (
          user.roles.includes('customer') &&
          order.customerId === user.id &&
          order.status === 'PENDING'
        );

      // Rule 4 and 5: Courier updates assigned order.
      case 'updateStatus':
        return (
          user.roles.includes('courier') &&
          order.courierId === user.id &&
          (order.status === 'PREPARING' || order.status === 'ON_THE_WAY')
        );

      default: {
        const unreachable: never = action;
        return unreachable;
      }
    }
  }
}
