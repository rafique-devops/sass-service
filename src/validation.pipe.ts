import { ArgumentMetadata, Injectable, PipeTransform, BadRequestException, Logger } from '@nestjs/common';
import { validate } from 'class-validator'; 
import { plainToClass } from 'class-transformer';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value; // Skip validation if no metatype or not intended for validation
    }
    
    const object = plainToClass(metatype, value); // Convert to class instance
    const errors = await validate(object);

    Logger.log('Validation Error: ', errors);
    if (errors.length > 0) {
      throw new BadRequestException('Validation failed'); 
    }

    return value; 
  }

  // Helper to check if we should validate
  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object]; 
    return !types.includes(metatype);
  }
}
