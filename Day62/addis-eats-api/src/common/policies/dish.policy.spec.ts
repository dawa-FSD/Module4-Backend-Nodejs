import { DishPolicy } from './dish.policy';
import type { AuthUser } from '../interfaces/auth-user.interface';

describe('DishPolicy', () => {
  let policy: DishPolicy;

  const restaurant: AuthUser = {
    id: 10,
    email: 'restaurant@example.com',
    roles: ['restaurant'],
    restaurantId: 10,
  };

  const otherRestaurant: AuthUser = {
    id: 11,
    email: 'other@example.com',
    roles: ['restaurant'],
    restaurantId: 11,
  };

  const dish = {
    id: 1,
    name: 'Kitfo',
    price: 350,
    restaurantId: 10,
  };

  beforeEach(() => {
    policy = new DishPolicy();
  });

  it('allows restaurant to edit its own dish', () => {
    expect(policy.canEdit(restaurant, dish)).toBe(true);
  });

  it('refuses another restaurant to edit the dish', () => {
    expect(policy.canEdit(otherRestaurant, dish)).toBe(false);
  });

  it('refuses customer to edit dish', () => {
    const customer: AuthUser = {
      id: 1,
      email: 'customer@example.com',
      roles: ['customer'],
    };

    expect(policy.canEdit(customer, dish)).toBe(false);
  });
});
