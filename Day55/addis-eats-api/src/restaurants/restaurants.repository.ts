import { Injectable } from '@nestjs/common';
import { Restaurant } from './restaurant.types';
import { SEED } from './restaurants.seed';

export const RESTAURANT_REPOSITORY = 'RESTAURANT_REPOSITORY';

export interface RestaurantRepository {
  all(): Restaurant[];
  byId(id: number): Restaurant | undefined;
  save(restaurant: Restaurant): Restaurant;
}

@Injectable()
export class InMemoryRestaurantRepository implements RestaurantRepository {
  private readonly rows = new Map<number, Restaurant>(
    SEED.map((restaurant) => [restaurant.id, restaurant]),
  );

  all(): Restaurant[] {
    return [...this.rows.values()];
  }

  byId(id: number): Restaurant | undefined {
    return this.rows.get(id);
  }

  save(restaurant: Restaurant): Restaurant {
    this.rows.set(restaurant.id, restaurant);
    return restaurant;
  }
}
