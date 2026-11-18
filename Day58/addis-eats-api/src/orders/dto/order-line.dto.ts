import { Type } from 'class-transformer';
import { IsInt, IsPositive } from 'class-validator';

export class OrderLineDto {
  @Type(() => Number)
  @IsInt({ message: 'dishId must be a whole number.' })
  @IsPositive({ message: 'dishId must be greater than zero.' })
  dishId!: number;

  @Type(() => Number)
  @IsInt({ message: 'quantity must be a whole number.' })
  @IsPositive({ message: 'quantity must be at least 1.' })
  quantity!: number;
}
