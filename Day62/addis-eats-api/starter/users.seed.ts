import { AuthUser } from '../src/common/interfaces/auth-user.interface';

export const users: AuthUser[] = [
  {
    id: 1,
    email: 'almaz@example.com',
    roles: ['customer'],
  },
  {
    id: 5,
    email: 'courier@example.com',
    roles: ['courier'],
  },
  {
    id: 10,
    email: 'restaurant@example.com',
    roles: ['restaurant'],
    restaurantId: 10,
  },
  {
    id: 9,
    email: 'staff@example.com',
    roles: ['staff'],
  },
];
