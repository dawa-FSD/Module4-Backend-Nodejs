import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';

import { Reflector } from '@nestjs/core';

import { OrdersService } from '../../orders/orders.service';

import { OrderPolicy, OrderAction } from '../policies/order.policy';

import { POLICY_KEY } from '../decorators/check-policy.decorator';

import { AuthUser } from '../interfaces/auth-user.interface';

@Injectable()
export class OrderPolicyGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly orders: OrdersService,
    private readonly policy: OrderPolicy,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const action = this.reflector.get<OrderAction>(
      POLICY_KEY,
      context.getHandler(),
    );

    if (!action) {
      return true;
    }

    const request = context.switchToHttp().getRequest();

    const user = request.user as AuthUser;

    const orderId = Number(request.params.id);

    // Load the order once.
    const order = await this.orders.findOne(orderId);

    // Make it available to the controller.
    request.order = order;

    const allowed = this.policy.can(user, action, order);

    if (!allowed) {
      if (action === 'read') {
        throw new NotFoundException(`Order ${orderId} not found`);
      }

      throw new ForbiddenException('You cannot perform this action');
    }

    return true;
  }
}
