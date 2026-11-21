import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function setupSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Addis Eats API')
    .setDescription(
      'Food delivery for Addis Ababa. Money is in whole santim, not birr. ' +
        'TeleBirr phone numbers use the 09XXXXXXXX format.',
    )
    .setVersion('1.0')
    .addTag('restaurants', 'Kitchens that take orders')
    .addTag('dishes', 'Items on a restaurant menu')
    .addTag('orders', 'Customer orders and their status')
    .addApiKey({ type: 'apiKey', name: 'x-api-key', in: 'header' }, 'api-key')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  if (process.env.EXPORT_OPENAPI === '1') {
    const fs = require('node:fs');
    fs.writeFileSync('openapi.json', JSON.stringify(document, null, 2));
  }

  if (process.env.NODE_ENV !== 'production') {
    SwaggerModule.setup('docs', app, document, {
      swaggerOptions: { persistAuthorization: true },
    });
  }

  return document;
}
