import { Role } from '../auth/roles';

export interface AuthUser {
  readonly id: number;
  email: string;
  roles: Role[];
  restaurantId?: number;
}
