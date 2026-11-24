import { Injectable } from '@nestjs/common';

import { AuthUser } from '../interfaces/auth-user.interface';

export interface Dish {
  id: number;
  name: string;
  price: number;
  restaurantId: number;
}

@Injectable()
export class DishPolicy {
  canEdit(user: AuthUser, dish: Dish): boolean {
    if (user.roles.includes('staff')) {
      return true;
    }

    return (
      user.roles.includes('restaurant') &&
      user.restaurantId !== undefined &&
      user.restaurantId === dish.restaurantId
    );
  }
}
