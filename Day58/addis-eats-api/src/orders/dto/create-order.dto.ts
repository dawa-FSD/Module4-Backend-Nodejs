import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsOptional,
  IsString,
  MinLength,
  Validate,
  ValidateNested,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { IsTeleBirrNumber } from '../../common/validators/is-telebirr-number.validator';
import { OrderLineDto } from './order-line.dto';

export enum PaymentMethod {
  CASH = 'CASH',
  TELEBIRR = 'TELEBIRR',
}

@ValidatorConstraint({ name: 'paymentMethodDetails', async: false })
class PaymentMethodDetailsConstraint implements ValidatorConstraintInterface {
  validate(paymentMethod: unknown, args: ValidationArguments): boolean {
    const dto = args.object as CreateOrderDto;
    return (
      paymentMethod !== PaymentMethod.TELEBIRR ||
      (typeof dto.teleBirrNumber === 'string' && dto.teleBirrNumber.length > 0)
    );
  }

  defaultMessage(): string {
    return 'teleBirrNumber is required when paymentMethod is TELEBIRR.';
  }
}

export class CreateOrderDto {
  @IsString({ message: 'customerName must be text.' })
  @MinLength(2, { message: 'customerName must contain at least 2 characters.' })
  customerName!: string;

  @IsEnum(PaymentMethod, {
    message: 'paymentMethod must be CASH or TELEBIRR.',
  })
  // Cross-field rule is attached to paymentMethod because this field
  // determines whether teleBirrNumber becomes mandatory.
  @Validate(PaymentMethodDetailsConstraint)
  paymentMethod!: PaymentMethod;

  @IsOptional()
  @IsTeleBirrNumber()
  teleBirrNumber?: string;

  @IsArray({ message: 'lines must be an array.' })
  @ArrayMinSize(1, { message: 'At least one order line is required.' })
  @ValidateNested({ each: true })
  @Type(() => OrderLineDto)
  lines!: OrderLineDto[];
}
