import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';

import { RestaurantNotFoundError } from './restaurants/restaurants.errors';
@Catch(RestaurantNotFoundError)
export class DomainErrorFilter implements ExceptionFilter {
  catch(error: RestaurantNotFoundError, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();

    response.status(404).json({
      statusCode: 404,
      message: error.message,
    });
  }
}
