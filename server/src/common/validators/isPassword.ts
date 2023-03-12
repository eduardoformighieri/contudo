import { BadRequestException } from '@nestjs/common';
import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

export function IsPassword(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isPassword',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          if (
            value === undefined ||
            value === null ||
            typeof value !== 'string'
          ) {
            throw new BadRequestException('Your password must be a string.');
          }
          if (!/[a-zA-Z]/.test(value)) {
            throw new BadRequestException(
              'Your password must have at least one letter.',
            );
          }
          if (!/\d/.test(value)) {
            throw new BadRequestException(
              'Your password must have at least one number.',
            );
          }
          if (value.length < 8) {
            throw new BadRequestException(
              'Your password must have at least 8 characters.',
            );
          }
          if (value.length > 72) {
            throw new BadRequestException(
              'Your password cannot have more than 72 characters.',
            );
          }
          return true;
        },
      },
    });
  };
}
