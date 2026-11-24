import { OrderPolicy } from './order.policy';

import { AuthUser } from '../interfaces/auth-user.interface';

import { Order } from '../../orders/interfaces/order.interface';

describe('OrderPolicy', () => {
  let policy: OrderPolicy;

  const customer: AuthUser = {
    id: 1,
    email: 'almaz@example.com',
    roles: ['customer'],
  };

  const anotherCustomer: AuthUser = {
    id: 2,
    email: 'dawit@example.com',
    roles: ['customer'],
  };

  const courier: AuthUser = {
    id: 5,
    email: 'courier@example.com',
    roles: ['courier'],
  };

  const anotherCourier: AuthUser = {
    id: 6,
    email: 'other-courier@example.com',
    roles: ['courier'],
  };

  const staff: AuthUser = {
    id: 9,
    email: 'staff@example.com',
    roles: ['staff'],
  };

  const order: Order = {
    id: 1,
    customerId: 1,
    courierId: 5,
    restaurantId: 10,
    status: 'PENDING',
    total: 350,
  };

  beforeEach(() => {
    policy = new OrderPolicy();
  });

  it('allows staff to read any order', () => {
    expect(policy.can(staff, 'read', order)).toBe(true);
  });

  it('allows customer to read own order', () => {
    expect(policy.can(customer, 'read', order)).toBe(true);
  });

  it('refuses another customer to read the order', () => {
    expect(policy.can(anotherCustomer, 'read', order)).toBe(false);
  });

  it('allows customer to cancel own pending order', () => {
    expect(policy.can(customer, 'cancel', order)).toBe(true);
  });

  it('refuses another customer to cancel the order', () => {
    expect(policy.can(anotherCustomer, 'cancel', order)).toBe(false);
  });

  it('refuses cancellation when order is ON_THE_WAY', () => {
    const movingOrder: Order = {
      ...order,
      status: 'ON_THE_WAY',
    };

    expect(policy.can(customer, 'cancel', movingOrder)).toBe(false);
  });

  it('allows assigned courier to update order', () => {
    const preparingOrder: Order = {
      ...order,
      status: 'PREPARING',
    };

    expect(policy.can(courier, 'updateStatus', preparingOrder)).toBe(true);
  });

  it('refuses unassigned courier to update order', () => {
    expect(policy.can(anotherCourier, 'updateStatus', order)).toBe(false);
  });

  it('refuses courier to cancel order', () => {
    expect(policy.can(courier, 'cancel', order)).toBe(false);
  });

  it('allows staff to cancel any order', () => {
    expect(policy.can(staff, 'cancel', order)).toBe(true);
  });
});
