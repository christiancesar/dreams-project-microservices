import Fastify from 'fastify';
import { FlightController, type UpdateFlightBody } from '../modules/controllers/FlightController.js';
import { type HealthCheck, runHealthChecks } from '../shared/health/healthCheck.js';
import { logger } from '../shared/logger/index.js';

type HttpServerOptions = {
  healthChecks: HealthCheck[];
  healthTimeoutMs: number;
};

// Servidor HTTP do serviço. As chamadas de negócio chegam por gRPC; o HTTP fica para o health e para o
// PATCH /flights, que o pacote usa para inativar o voo quando o hotel falha.
// O próprio Fastify loga cada requisição com método, URL, status e responseTime.
export function buildHttpServer({ healthChecks, healthTimeoutMs }: HttpServerOptions) {
  const app = Fastify({ loggerInstance: logger });

  // 200 quando tudo está ok ou degradado, 503 quando algum recurso está down.
  app.get('/health', async (_, reply) => {
    const report = await runHealthChecks(healthChecks, {
      service: 'flightMicroservice',
      timeoutMs: healthTimeoutMs,
    });

    if (report.status !== 'ok') {
      app.log.warn({ health: report }, 'health check not ok');
    }

    return reply.status(report.status === 'down' ? 503 : 200).send(report);
  });

  const flightController = new FlightController();

  app.patch<{ Body: UpdateFlightBody }>('/flights', (request, reply) => flightController.update(request, reply));

  return app;
}
