import { IsInt, IsOptional, IsString, Length, Min } from 'class-validator';

export class CreateDishDto {
  /** Dish name. @example "Doro Wat" */
  @IsString()
  @Length(2, 80)
  name!: string;

  /** Restaurant id that serves this dish. @example 1 */
  @IsInt()
  @Min(1)
  restaurantId!: number;

  /** Price in whole santim, not birr. 24000 means 240.00 ETB. @example 24000 */
  @IsInt()
  @Min(1)
  priceSantim!: number;
}

export class UpdateDishDto {
  @IsOptional()
  @IsString()
  @Length(2, 80)
  name?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  restaurantId?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  priceSantim?: number;
}

export class DishDto {
  id!: number;
  name!: string;
  restaurantId!: number;
  priceSantim!: number;
}
