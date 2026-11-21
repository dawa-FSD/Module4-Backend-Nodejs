import { Injectable, NotFoundException } from '@nestjs/common';
import { PinoLogger } from 'nestjs-pino';
import { CreateRestaurantDto, UpdateRestaurantDto } from './dto/restaurant.dto';

@Injectable()
export class RestaurantsService {
  private readonly restaurants = [
    { id: 1, name: 'Yod Abyssinia', area: 'BOLE', isOpen: true },
    { id: 2, name: 'Kategna', area: 'BOLE', isOpen: true },
    { id: 3, name: 'Tikus Shiro', area: 'ARADA', isOpen: false },
  ];
  private nextId = 4;

  constructor(private readonly logger: PinoLogger) {
    this.logger.setContext(RestaurantsService.name);
  }

  findAll(page = 1, limit = 10) {
    const start = (page - 1) * limit;
    const data = this.restaurants.slice(start, start + limit);
    return { data, meta: { page, limit, total: this.restaurants.length } };
  }

  findOne(id: number) {
    const restaurant = this.restaurants.find((item) => item.id === id);
    if (!restaurant) throw new NotFoundException('Restaurant not found');
    return restaurant;
  }

  create(dto: CreateRestaurantDto) {
    const restaurant = { id: this.nextId++, ...dto };
    this.restaurants.push(restaurant);
    this.logger.info(
      { restaurantId: restaurant.id, area: restaurant.area },
      'restaurant created',
    );
    return restaurant;
  }

  update(id: number, dto: UpdateRestaurantDto) {
    const restaurant = this.findOne(id);
    Object.assign(restaurant, dto);
    this.logger.info({ restaurantId: id }, 'restaurant updated');
    return restaurant;
  }
}
