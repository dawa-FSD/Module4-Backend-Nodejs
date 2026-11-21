import { Injectable, NotFoundException } from '@nestjs/common';
import { PinoLogger } from 'nestjs-pino';
import { DishesService } from '../dishes/dishes.service';
import { CreateOrderDto, UpdateOrderStatusDto } from './dto/order.dto';

@Injectable()
export class OrdersService {
  private readonly orders: any[] = [];
  private nextId = 1;

  constructor(
    private readonly logger: PinoLogger,
    private readonly dishesService: DishesService,
  ) {
    this.logger.setContext(OrdersService.name);
  }

  findAll(page = 1, limit = 10) {
    const newestFirst = [...this.orders].reverse();
    const start = (page - 1) * limit;
    return {
      data: newestFirst.slice(start, start + limit),
      meta: { page, limit, total: this.orders.length },
    };
  }

  findOne(id: number) {
    const order = this.orders.find((item) => item.id === id);
    if (!order) throw new NotFoundException('Order not found');
    return order;
  }

  create(dto: CreateOrderDto) {
    const lines = dto.lines.map((line) => {
      const dish = this.dishesService.findOne(line.dishId);
      return {
        dishId: dish.id,
        dishName: dish.name,
        quantity: line.quantity,
        unitPriceSantim: dish.priceSantim,
        lineTotalSantim: dish.priceSantim * line.quantity,
      };
    });

    const order = {
      id: this.nextId++,
      customer: dto.customer,
      area: dto.area,
      phone: dto.phone,
      lines,
      totalSantim: lines.reduce((sum, line) => sum + line.lineTotalSantim, 0),
      status: 'Pending',
    };

    this.orders.push(order);
    this.logger.info(
      { orderId: order.id, area: order.area, totalSantim: order.totalSantim },
      'order created',
    );
    return order;
  }

  updateStatus(id: number, dto: UpdateOrderStatusDto) {
    const order = this.findOne(id);
    order.status = dto.status;
    this.logger.info(
      { orderId: id, status: dto.status },
      'order status updated',
    );
    return order;
  }
}
