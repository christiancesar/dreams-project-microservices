import { type CheckStatus, type HealthReport, runHealthChecks } from '../../shared/health/healthCheck.js';
import { checkRemoteHealth, createRemoteHealthTargets } from '../../grpc/health/clients.js';

export type ServiceHealth = {
  status: CheckStatus;
  responseTimeMs: number;
  details: string;
  report?: HealthReport;
};

export type GatewayHealthReport = HealthReport & {
  services: Record<string, ServiceHealth>;
};

// Converte a mensagem protobuf do outro serviço para o mesmo formato de relatório usado na API.
function fromRemoteMessage(message: { toObject(): any }): HealthReport {
  const data = message.toObject();

  const checks = Object.fromEntries(
    (data.checksList as Array<{ name: string; status: CheckStatus; responseTimeMs: number; details: string }>).map((check) => [
      check.name,
      { status: check.status, responseTimeMs: check.responseTimeMs, details: check.details || undefined },
    ]),
  );

  return {
    status: data.status as CheckStatus,
    service: data.service,
    timestamp: data.timestamp,
    uptimeSeconds: data.uptimeSeconds,
    responseTimeMs: data.responseTimeMs,
    checks,
  };
}

// Consulta cada serviço por gRPC e também o próprio gateway.
// Política: se algum serviço não estiver ok, o gateway fica degraded (não down), porque as rotas dos outros continuam funcionando.
// O prazo para outro serviço responder é maior que o timeout interno dele, senão um serviço com dependência
// lenta aparece como down no gateway antes de terminar a própria verificação.
const REMOTE_TIMEOUT_MS = Number(process.env.HEALTH_REMOTE_TIMEOUT_MS ?? 5000);

export async function buildGatewayHealth(timeoutMs: number): Promise<GatewayHealthReport> {
  const services = Object.fromEntries(
    await Promise.all(
      createRemoteHealthTargets().map(async (target): Promise<[string, ServiceHealth]> => {
        const startedAt = performance.now();
        const elapsed = () => Number((performance.now() - startedAt).toFixed(2));

        try {
          const report = fromRemoteMessage(await checkRemoteHealth(target, REMOTE_TIMEOUT_MS));

          return [target.name, { status: report.status, responseTimeMs: elapsed(), details: `${target.address} reported ${report.status}`, report }];
        } catch (error) {
          const reason = error instanceof Error ? error.message : 'unknown error';

          return [target.name, { status: 'down', responseTimeMs: elapsed(), details: `${target.address} unreachable: ${reason}` }];
        }
      }),
    ),
  ) as Record<string, ServiceHealth>;

  const own = await runHealthChecks(
    [{ name: 'api', run: async () => ({ status: 'ok', details: 'HTTP gateway responding' }) }],
    { service: 'apiGateway', timeoutMs },
  );

  const anyServiceNotOk = Object.values(services).some((service) => service.status !== 'ok');

  return {
    ...own,
    status: anyServiceNotOk && own.status === 'ok' ? 'degraded' : own.status,
    services,
  };
}
