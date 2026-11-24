import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { OrdersService } from '../../orders/orders.service';

import { AuthUser } from '../interfaces/auth-user.interface';

@Injectable()
export class OrderOwnershipGuard implements CanActivate {
  constructor(private readonly orders: OrdersService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const user = request.user as AuthUser;

    const orderId = Number(request.params.id);

    const order = await this.orders.findOne(orderId);

    if (user.roles.includes('staff')) {
      request.order = order;
      return true;
    }

    const isOwner = order.customerId === user.id;

    const isAssignedCourier =
      user.roles.includes('courier') && order.courierId === user.id;

    if (!isOwner && !isAssignedCourier) {
      throw new NotFoundException(`Order ${orderId} not found`);
    }

    request.order = order;

    return true;
  }
}
