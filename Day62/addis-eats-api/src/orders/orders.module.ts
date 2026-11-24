import { Module } from '@nestjs/common';

import { OrdersController } from './orders.controller';

import { OrdersService } from './orders.service';

import { OrderPolicy } from '../common/policies/order.policy';

import { OrderPolicyGuard } from '../common/guards/order-policy.guard';

import { OrderOwnershipGuard } from '../common/guards/order-ownership.guard';

@Module({
  controllers: [OrdersController],

  providers: [
    OrdersService,
    OrderPolicy,
    OrderPolicyGuard,
    OrderOwnershipGuard,
  ],

  exports: [OrdersService, OrderPolicy],
})
export class OrdersModule {}
