import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Request, Response } from 'express';

type ErrorBody = {
  statusCode: number;
  message: string | string[];
  path: string;
  timestamp: string;
  requestId: string;
};

@Catch()
@Injectable()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request & { requestId?: string }>();

    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: string | string[] = 'An unexpected error occurred. Please try again later.';

    if (exception instanceof HttpException) {
      statusCode = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      if (typeof exceptionResponse === 'string') {
        message = exceptionResponse;
      } else if (
        typeof exceptionResponse === 'object' &&
        exceptionResponse !== null &&
        'message' in exceptionResponse
      ) {
        const suppliedMessage = (exceptionResponse as { message: unknown }).message;
        if (typeof suppliedMessage === 'string' || Array.isArray(suppliedMessage)) {
          message = suppliedMessage as string | string[];
        }
      }
    }

    const body: ErrorBody = {
      statusCode,
      message,
      path: request.url,
      timestamp: new Date().toISOString(),
      requestId: request.requestId ?? randomUUID(),
    };

    response.status(statusCode).json(body);
  }
}
