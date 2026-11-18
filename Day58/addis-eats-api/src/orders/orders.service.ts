import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderStatus } from './order-status.enum';

type Dish = {
  id: number;
  name: string;
  priceSantim: number;
  available: boolean;
};

type OrderLine = {
  dishId: number;
  dishName: string;
  quantity: number;
  unitPriceSantim: number;
  lineTotalSantim: number;
};

export type Order = {
  id: number;
  customerName: string;
  paymentMethod: string;
  teleBirrNumber?: string;
  status: OrderStatus;
  lines: OrderLine[];
  totalSantim: number;
  createdAt: string;
};

@Injectable()
export class OrdersService {
  private readonly dishes = new Map<number, Dish>([
    [1, { id: 1, name: 'Kitfo', priceSantim: 35000, available: true }],
    [2, { id: 2, name: 'Doro Wot', priceSantim: 40000, available: true }],
    [3, { id: 3, name: 'Shiro', priceSantim: 25000, available: true }],
    [4, { id: 4, name: 'Chechebsa', priceSantim: 22000, available: true }],
  ]);

  private readonly orders = new Map<number, Order>();
  private nextId = 1;

  private readonly allowedTransitions: Record<OrderStatus, OrderStatus[]> = {
    [OrderStatus.PENDING]: [OrderStatus.CONFIRMED, OrderStatus.CANCELLED],
    [OrderStatus.CONFIRMED]: [OrderStatus.PREPARING, OrderStatus.CANCELLED],
    [OrderStatus.PREPARING]: [OrderStatus.READY],
    [OrderStatus.READY]: [OrderStatus.COMPLETED],
    [OrderStatus.COMPLETED]: [],
    [OrderStatus.CANCELLED]: [],
  };

  create(dto: CreateOrderDto): Order {
    // Guard 1: existence — every requested dish must exist.
    const requestedDishes = dto.lines.map((line) => {
      const dish = this.dishes.get(line.dishId);
      if (!dish) {
        throw new NotFoundException(`Dish ${line.dishId} was not found.`);
      }
      return { line, dish };
    });

    // Guard 2: state — existing dishes must currently be available.
    for (const { dish } of requestedDishes) {
      if (!dish.available) {
        throw new ConflictException(`Dish ${dish.name} is currently unavailable.`);
      }
    }

    // Guard 3: relationship — prevent duplicate dish lines in one order.
    const dishIds = dto.lines.map((line) => line.dishId);
    if (new Set(dishIds).size !== dishIds.length) {
      throw new ConflictException('Each dish may appear only once in an order.');
    }

    // Guard 4: work — quantities and calculated totals must be safe to process.
    const lines: OrderLine[] = requestedDishes.map(({ line, dish }) => {
      const lineTotalSantim = dish.priceSantim * line.quantity;
      if (!Number.isSafeInteger(lineTotalSantim)) {
        throw new ConflictException('The requested order quantity is too large.');
      }
      return {
        dishId: dish.id,
        dishName: dish.name,
        quantity: line.quantity,
        unitPriceSantim: dish.priceSantim,
        lineTotalSantim,
      };
    });

    const totalSantim = lines.reduce(
      (total, line) => total + line.lineTotalSantim,
      0,
    );

    if (!Number.isSafeInteger(totalSantim)) {
      throw new ConflictException('The order total is outside the supported range.');
    }

    const order: Order = {
      id: this.nextId++,
      customerName: dto.customerName,
      paymentMethod: dto.paymentMethod,
      teleBirrNumber: dto.teleBirrNumber,
      status: OrderStatus.PENDING,
      lines,
      totalSantim,
      createdAt: new Date().toISOString(),
    };

    this.orders.set(order.id, order);
    return order;
  }

  findAll(): Order[] {
    return [...this.orders.values()];
  }

  findOne(id: number): Order {
    const order = this.orders.get(id);
    if (!order) {
      throw new NotFoundException(`Order ${id} was not found.`);
    }
    return order;
  }

  changeStatus(id: number, nextStatus: OrderStatus): Order {
    const order = this.findOne(id);
    const allowed = this.allowedTransitions[order.status];

    if (!allowed.includes(nextStatus)) {
      throw new ConflictException(
        `Order cannot move from ${order.status} to ${nextStatus}.`,
      );
    }

    order.status = nextStatus;
    return order;
  }
}
