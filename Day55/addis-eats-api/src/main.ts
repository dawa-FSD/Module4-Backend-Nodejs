// import { NestFactory } from '@nestjs/core';
// import { AppModule, ObserveInstrument } from './app.module';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule, {
//     instrument: ObserveInstrument,
//   });
//   await app.listen(process.env.PORT ?? 3000);
// }
// void bootstrap();
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';
import { DomainErrorFilter } from './domain-error.filter';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  app.useGlobalFilters(new DomainErrorFilter());

  await app.listen(3000);
}

bootstrap();
