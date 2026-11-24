import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { Order } from '../../orders/interfaces/order.interface';

export const CurrentOrder = createParamDecorator(
  (data: unknown, context: ExecutionContext): Order => {
    const request = context.switchToHttp().getRequest();

    return request.order;
  },
);
