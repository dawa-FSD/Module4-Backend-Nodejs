import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(private readonly config: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const suppliedKey = request.headers['x-api-key'];
    const expectedKey = this.config.get<string>('API_KEY');

    if (!suppliedKey) {
      throw new UnauthorizedException('x-api-key is required');
    }

    if (!expectedKey || suppliedKey !== expectedKey) {
      throw new ForbiddenException('Invalid API key');
    }

    return true;
  }
}
