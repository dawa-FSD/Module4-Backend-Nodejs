import { LoggerModule } from 'nestjs-pino';

export const loggerConfig = LoggerModule.forRoot({
  pinoHttp: {
    level: process.env.LOG_LEVEL ?? 'info',

    genReqId: (req) => {
      const requestId = req.headers['x-request-id'];

      return typeof requestId === 'string' ? requestId : crypto.randomUUID();
    },

    redact: {
      paths: [
        'req.headers.authorization',
        "req.headers['x-api-key']",
        'req.body.password',
        '*.phone',
      ],
      censor: '[redacted]',
    },

    transport:
      process.env.NODE_ENV === 'development'
        ? {
            target: 'pino-pretty',
            options: {
              colorize: true,
              singleLine: true,
            },
          }
        : undefined,
  },
});
