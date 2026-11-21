import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import { loggerConfig } from './config/logger.config';
import { ApiKeyGuard } from './common/guards/api-key.guard';
import { AppController } from './app.controller';
import { RestaurantsModule } from './restaurnats/restaurants.module';
import { DishesModule } from './dishes/dishes.module';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    LoggerModule.forRoot(loggerConfig),
    RestaurantsModule,
    DishesModule,
    OrdersModule,
  ],
  controllers: [AppController],
  providers: [{ provide: APP_GUARD, useClass: ApiKeyGuard }],
})
export class AppModule {}
