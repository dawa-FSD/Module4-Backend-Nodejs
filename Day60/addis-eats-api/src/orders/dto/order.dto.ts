import { Type } from 'class-transformer';
import {
  ArrayMinSize, IsArray, IsIn, IsInt, IsOptional, IsString, Length,
  Min, Matches, ValidateNested,
} from 'class-validator';

export class OrderLineDto {
  /** Dish identifier. @example 1 */
  @IsInt()
  @Min(1)
  dishId!: number;

  /** Quantity ordered. @example 2 */
  @IsInt()
  @Min(1)
  quantity!: number;
}

export class CreateOrderDto {
  /** Customer full name. @example "Abebe Kebede" */
  @IsString()
  @Length(2, 80)
  customer!: string;

  /** Addis Ababa delivery area. @example "BOLE" */
  @IsIn(['BOLE', 'KIRKOS', 'ARADA', 'Yeka'])
  area!: string;

  /** TeleBirr phone number; optional until payment. @example "0912345678" */
  @IsOptional()
  @IsString()
  @Matches(/^09\\d{8}$/, { message: 'phone must be a valid TeleBirr number (09XXXXXXXX)' })
  phone?: string;

  /** At least one order line. */
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => OrderLineDto)
  lines!: OrderLineDto[];
}

export class UpdateOrderStatusDto {
  @IsIn(['Pending', 'Preparing', 'Delivered', 'Cancelled'])
  status!: string;
}

export class OrderDto {
  id!: number;
  customer!: string;
  area!: string;
  phone?: string;
  lines!: OrderLineDto[];
  totalSantim!: number;
  status!: string;
}
