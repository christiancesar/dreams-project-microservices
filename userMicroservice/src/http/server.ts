import Fastify from 'fastify';
import { type HealthCheck, runHealthChecks } from '../shared/health/healthCheck.js';
import { logger } from '../shared/logger/index.js';

type HttpServerOptions = {
  healthChecks: HealthCheck[];
  healthTimeoutMs: number;
};

// Servidor HTTP auxiliar. As chamadas de negócio chegam por gRPC.
// O próprio Fastify loga cada requisição com método, URL, status e responseTime.
export function buildHttpServer({ healthChecks, healthTimeoutMs }: HttpServerOptions) {
  const app = Fastify({ loggerInstance: logger });

  // 200 quando tudo está ok ou degradado, 503 quando algum recurso está down.
  app.get('/health', async (_, reply) => {
    const report = await runHealthChecks(healthChecks, {
      service: 'userMicroservice',
      timeoutMs: healthTimeoutMs,
    });

    if (report.status !== 'ok') {
      app.log.warn({ health: report }, 'health check not ok');
    }

    return reply.status(report.status === 'down' ? 503 : 200).send(report);
  });

  return app;
}
