export const ROLES = ['customer', 'courier', 'restaurant', 'staff'] as const;

export type Role = (typeof ROLES)[number];
