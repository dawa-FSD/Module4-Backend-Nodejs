import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';

export function IsSantim(
  options?: ValidationOptions,
): PropertyDecorator {
  return (target: object, propertyName: string | symbol) => {
    registerDecorator({
      name: 'isSantim',
      target: target.constructor,
      propertyName: String(propertyName),
      options,
      validator: {
        validate(value: unknown): boolean {
          return (
            typeof value === 'number' &&
            Number.isSafeInteger(value) &&
            value >= 0
          );
        },
        defaultMessage(args: ValidationArguments): string {
          return `${args.property} must be a non-negative whole number of santim (for example, 12500).`;
        },
      },
    });
  };
}
