import { randomUUID } from 'node:crypto';

export const loggerConfig = {
  pinoHttp: {
    level: process.env.LOG_LEVEL ?? 'info',
    genReqId: (req: any) => req.headers['x-request-id'] ?? randomUUID(),
    customProps: (req: any) => ({ requestId: req.id }),
    redact: {
      paths: [
        'req.headers.authorization',
        'req.headers.x-api-key',
        'req.body.password',
        'req.body.phone',
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
};
