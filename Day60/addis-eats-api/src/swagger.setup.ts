import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';
import { writeFileSync } from 'node:fs';

export function setupSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Addis Eats API')
    .setDescription(
      'Food delivery API for Addis Ababa. Money is in santim; phone numbers use TeleBirr format.',
    )
    .setVersion('1.0')
    .addTag('restaurants', 'Kitchens that take orders')
    .addTag('dishes', 'Items on a restaurant menu')
    .addTag('orders', 'Customer orders and their status')
    .addApiKey(
      {
        type: 'apiKey',
        name: 'x-api-key',
        in: 'header',
      },
      'x-api-key',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);

  if (process.env.EXPORT_OPENAPI === '1') {
    writeFileSync('openapi.json', JSON.stringify(document, null, 2));
  }

  if (process.env.NODE_ENV !== 'production') {
    SwaggerModule.setup('docs', app, document, {
      swaggerOptions: {
        persistAuthorization: true,
      },
    });
  }
}
