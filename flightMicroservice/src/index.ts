import "reflect-metadata";
import "./shared/containers/index.js";
import "./shared/providers/index.js";
import { prisma } from '../prisma/index.js';
import { createGrpcServer } from './grpc/server.js';
import { buildHttpServer } from './http/server.js';
import { logger } from './shared/logger/index.js';
import { databaseHealthCheck } from './shared/health/checks/databaseHealthCheck.js';

const GRPC_ADDRESS = process.env.GRPC_ADDRESS ?? '0.0.0.0:50053';
const HTTP_PORT = Number(process.env.HTTP_PORT ?? 3332);
const HEALTH_CHECK_TIMEOUT_MS = Number(process.env.HEALTH_CHECK_TIMEOUT_MS ?? 2000);

// Novos recursos entram na lista de extraHealthChecks, e aparecem tanto no HTTP quanto no gRPC.
const extraHealthChecks = [databaseHealthCheck];

const grpc = createGrpcServer({
  service: 'flightMicroservice',
  extraHealthChecks,
  healthTimeoutMs: HEALTH_CHECK_TIMEOUT_MS,
});

const http = buildHttpServer({
  healthChecks: [grpc.apiHealthCheck, ...extraHealthChecks],
  healthTimeoutMs: HEALTH_CHECK_TIMEOUT_MS,
});

async function shutdown(signal: NodeJS.Signals) {
  logger.info({ signal }, 'shutting down');

  await grpc.shutdown();
  await http.close();
  await prisma.$disconnect();

  process.exit(0);
}

process.on('SIGINT', () => void shutdown('SIGINT'));
process.on('SIGTERM', () => void shutdown('SIGTERM'));

async function main() {
  const port = await grpc.listen(GRPC_ADDRESS);
  await prisma.$connect();
  logger.info({ port }, 'gRPC server listening');

  await http.listen({ port: HTTP_PORT, host: '0.0.0.0' });
}

main().catch(async (error) => {
  logger.fatal({ err: error }, 'failed to start flight microservice');
  await prisma.$disconnect();
  process.exit(1);
});
