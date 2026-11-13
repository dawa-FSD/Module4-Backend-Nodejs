import { IsString, Length, IsIn, IsBoolean, IsOptional } from 'class-validator';

import { AREAS } from '../restaurant.types';
import type { Area } from '../restaurant.types';

export class CreateRestaurantDto {
  @IsString()
  @Length(2, 80)
  name!: string;

  @IsIn(AREAS)
  area!: Area;

  @IsBoolean()
  @IsOptional()
  isOpen?: boolean;
}
