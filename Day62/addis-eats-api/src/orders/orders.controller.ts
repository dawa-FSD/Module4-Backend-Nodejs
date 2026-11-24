import {
  Controller,
  Get,
  Delete,
  Patch,
  Body,
  UseGuards,
  Req,
} from '@nestjs/common';

import { OrdersService } from './orders.service';

import { Roles } from '../common/decorators/roles.decorator';

import { CheckPolicy } from '../common/decorators/check-policy.decorator';

import { CurrentOrder } from '../common/decorators/current-order.decorator';

import { OrderPolicyGuard } from '../common/guards/order-policy.guard';

import { OrderOwnershipGuard } from '../common/guards/order-ownership.guard';

import { AuthUser } from '../common/interfaces/auth-user.interface';

import type { Order, OrderStatus } from './interfaces/order.interface';

@Controller('api/v1/orders')
export class OrdersController {
  constructor(private readonly orders: OrdersService) {}

  // GET all orders belonging to the caller.
  @Get()
  async findAll(@Req() request: { user: AuthUser }) {
    return this.orders.findAllForUser(request.user);
  }

  // GET one order.
  @UseGuards(OrderPolicyGuard)
  @CheckPolicy('read')
  @Get(':id')
  findOne(@CurrentOrder() order: Order) {
    return order;
  }

  // DELETE an order.
  @UseGuards(OrderPolicyGuard)
  @Roles('customer', 'staff')
  @CheckPolicy('cancel')
  @Delete(':id')
  async cancel(@CurrentOrder() order: Order) {
    return this.orders.cancelLoaded(order);
  }

  // PATCH order status.
  @UseGuards(OrderPolicyGuard)
  @Roles('courier', 'staff')
  @CheckPolicy('updateStatus')
  @Patch(':id/status')
  async updateStatus(
    @CurrentOrder() order: Order,
    @Body('status') status: OrderStatus,
  ) {
    return this.orders.updateLoadedStatus(order, status);
  }
}
