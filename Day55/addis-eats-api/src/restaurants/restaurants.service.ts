import { Inject, Injectable } from '@nestjs/common';
import { RESTAURANT_REPOSITORY } from './restaurants.repository';
import type { RestaurantRepository } from './restaurants.repository';
import type { Restaurant, Area } from './restaurant.types';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { RestaurantNotFoundError } from './restaurants.errors';

@Injectable()
export class RestaurantsService {
  constructor(
    @Inject(RESTAURANT_REPOSITORY)
    private readonly repo: RestaurantRepository,
  ) {}

  findAll(area?: Area): Restaurant[] {
    const rows = this.repo.all();

    return area ? rows.filter((restaurant) => restaurant.area === area) : rows;
  }

  findOne(id: number): Restaurant {
    const restaurant = this.repo.byId(id);

    if (!restaurant) {
      throw new RestaurantNotFoundError(id);
    }

    return restaurant;
  }

  create(dto: CreateRestaurantDto): Restaurant {
    const id = Math.max(0, ...this.repo.all().map((r) => r.id)) + 1;

    return this.repo.save({
      ...dto,
      id,
      isOpen: dto.isOpen ?? true,
    });
  }
}
