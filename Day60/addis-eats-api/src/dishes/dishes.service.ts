import { Injectable, NotFoundException } from '@nestjs/common';
import { PinoLogger } from 'nestjs-pino';
import { CreateDishDto, DishDto, UpdateDishDto } from './dto/dish.dto';

@Injectable()
export class DishesService {
  private readonly dishes: DishDto[] = [];
  private nextId = 1;

  constructor(private readonly logger: PinoLogger) {
    this.logger.setContext(DishesService.name);
  }

  findAll(page = 1, limit = 10) {
    const start = (page - 1) * limit;
    const data = this.dishes.slice(start, start + limit);

    return {
      data,
      meta: {
        page,
        limit,
        total: this.dishes.length,
      },
    };
  }

  findOne(id: number): DishDto {
    const dish = this.dishes.find((item) => item.id === id);

    if (!dish) {
      throw new NotFoundException('Dish not found');
    }

    return dish;
  }

  create(dto: CreateDishDto): DishDto {
    const dish: DishDto = {
      id: this.nextId++,
      ...dto,
    };

    this.dishes.push(dish);

    this.logger.info(
      {
        dishId: dish.id,
        restaurantId: dish.restaurantId,
      },
      'dish created',
    );

    return dish;
  }

  update(id: number, dto: UpdateDishDto): DishDto {
    const dish = this.findOne(id);

    Object.assign(dish, dto);

    this.logger.info({ dishId: id }, 'dish updated');

    return dish;
  }
}
