import { Module } from '@nestjs/common';
import { DishesModule } from '../dishes/dishes.module';
import { DishesService } from '../dishes/dishes.service';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';

@Module({
  imports: [DishesModule],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
