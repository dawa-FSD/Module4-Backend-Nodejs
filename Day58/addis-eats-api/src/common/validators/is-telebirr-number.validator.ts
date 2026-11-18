import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'isTeleBirrNumber', async: false })
export class IsTeleBirrNumberConstraint
  implements ValidatorConstraintInterface
{
  validate(value: unknown): boolean {
    return (
      typeof value === 'string' &&
      /^(09\d{8}|\+2519\d{8})$/.test(value)
    );
  }

  defaultMessage(args: ValidationArguments): string {
    return `${args.property} must be a valid TeleBirr number: use 09XXXXXXXX or +2519XXXXXXXX.`;
  }
}

export function IsTeleBirrNumber(
  options?: ValidationOptions,
): PropertyDecorator {
  return (target: object, propertyName: string | symbol) => {
    registerDecorator({
      name: 'isTeleBirrNumber',
      target: target.constructor,
      propertyName: String(propertyName),
      options,
      validator: IsTeleBirrNumberConstraint,
    });
  };
}
