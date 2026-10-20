import pino from 'pino';

const isProduction = process.env.NODE_ENV === 'production';

// Em desenvolvimento a saída passa pelo pino-pretty; em produção fica em JSON puro para coleta.
export const logger = pino({
  name: 'userMicroservice',
  level: process.env.LOG_LEVEL ?? (isProduction ? 'info' : 'debug'),
  ...(isProduction
    ? {}
    : {
        transport: {
          target: 'pino-pretty',
          options: { translateTime: 'HH:MM:ss.l', ignore: 'pid,hostname' },
        },
      }),
});
