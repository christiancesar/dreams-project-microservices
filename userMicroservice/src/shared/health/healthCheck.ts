export type CheckStatus = 'ok' | 'degraded' | 'down';

export type CheckOutcome = {
  status: CheckStatus;
  details?: string;
};

// Cada recurso do serviço (banco, gRPC, cache, fila...) implementa uma verificação com este formato.
export type HealthCheck = {
  name: string;
  run: () => Promise<CheckOutcome>;
};

export type CheckReport = CheckOutcome & {
  responseTimeMs: number;
};

export type HealthReport = {
  status: CheckStatus;
  service: string;
  timestamp: string;
  uptimeSeconds: number;
  responseTimeMs: number;
  checks: Record<string, CheckReport>;
};

const severity: Record<CheckStatus, number> = { ok: 0, degraded: 1, down: 2 };

const round = (value: number) => Number(value.toFixed(2));

// Uma verificação que demora mais que o timeout é tratada como down, para o health não travar.
async function runWithTimeout(check: HealthCheck, timeoutMs: number): Promise<CheckOutcome> {
  let timer: NodeJS.Timeout | undefined;

  const timeout = new Promise<CheckOutcome>((resolve) => {
    timer = setTimeout(
      () => resolve({ status: 'down', details: `timeout after ${timeoutMs}ms` }),
      timeoutMs,
    );
  });

  try {
    return await Promise.race([check.run(), timeout]);
  } catch (err) {
    return { status: 'down', details: err instanceof Error ? err.message : 'unknown error' };
  } finally {
    clearTimeout(timer);
  }
}

export async function runHealthChecks(
  checks: HealthCheck[],
  options: { service: string; timeoutMs: number },
): Promise<HealthReport> {
  const startedAt = performance.now();

  const results = await Promise.all(
    checks.map(async (check) => {
      const checkStartedAt = performance.now();
      const outcome = await runWithTimeout(check, options.timeoutMs);

      const report: CheckReport = {
        ...outcome,
        responseTimeMs: round(performance.now() - checkStartedAt),
      };

      return [check.name, report] as const;
    }),
  );

  const checkReports = Object.fromEntries(results);

  const status = results.reduce<CheckStatus>(
    (worst, [, report]) => (severity[report.status] > severity[worst] ? report.status : worst),
    'ok',
  );

  return {
    status,
    service: options.service,
    timestamp: new Date().toISOString(),
    uptimeSeconds: round(process.uptime()),
    responseTimeMs: round(performance.now() - startedAt),
    checks: checkReports,
  };
}
