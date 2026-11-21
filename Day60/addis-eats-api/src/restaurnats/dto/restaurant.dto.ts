import { IsBoolean, IsIn, IsOptional, IsString, Length } from 'class-validator';

export const AREAS = ['BOLE', 'KIRKOS', 'ARADA', 'Yeka'] as const;

export class CreateRestaurantDto {
  /** Restaurant display name. @example "Yod Abyssinia" */
  @IsString()
  @Length(2, 80)
  name!: string;

  /** Addis Ababa delivery area. @example "BOLE" */
  @IsIn(AREAS)
  area!: string;

  /** Whether the restaurant currently accepts orders. @example true */
  @IsBoolean()
  isOpen!: boolean;
}

export class UpdateRestaurantDto {
  @IsOptional()
  @IsString()
  @Length(2, 80)
  name?: string;

  @IsOptional()
  @IsIn(AREAS)
  area?: string;

  @IsOptional()
  @IsBoolean()
  isOpen?: boolean;
}

export class RestaurantDto {
  id!: number;
  name!: string;
  area!: string;
  isOpen!: boolean;
}
