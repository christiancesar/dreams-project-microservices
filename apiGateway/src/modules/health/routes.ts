import { type FastifyInstance } from "fastify";
import { type ZodTypeProvider } from "fastify-type-provider-zod";
import { GatewayHealthSchema } from "../../schemas/health.js";
import { buildGatewayHealth } from "./healthService.js";

const HEALTH_CHECK_TIMEOUT_MS = Number(process.env.HEALTH_CHECK_TIMEOUT_MS ?? 2000);

export default async function healthRoutes(app: FastifyInstance) {
  const server = app.withTypeProvider<ZodTypeProvider>();

  server.get('/health', {
    schema: {
      tags: ['Saúde'],
      summary: 'Saúde do gateway e de todos os microsserviços',
      description: 'Consulta por gRPC o método Health.Check de cada microsserviço e devolve o relatório agregado. Retorna 200 em ok ou degraded e 503 em down.',
      response: { 200: GatewayHealthSchema, 503: GatewayHealthSchema },
    },
  }, async (_request, reply) => {
    const report = await buildGatewayHealth(HEALTH_CHECK_TIMEOUT_MS);

    return reply.status(report.status === 'down' ? 503 : 200).send(report);
  });
}
