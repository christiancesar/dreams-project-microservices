import type { sendUnaryData, ServerUnaryCall } from "@grpc/grpc-js";
import { CheckResult, HealthCheckRequest, HealthReport as HealthReportMessage } from "dreams-proto-sharing/src/contracts/health/health_pb.js";
import type { IHealthServer } from "dreams-proto-sharing/src/contracts/health/health_grpc_pb.js";
import { type HealthCheck, type HealthReport, runHealthChecks } from "../../shared/health/healthCheck.js";
import { withGrpcRequestLogging } from "../../shared/logging/grpcRequestLogger.js";

// Converte o relatório interno para a mensagem protobuf do contrato dreams.health.v1.
export function toHealthReportMessage(report: HealthReport): HealthReportMessage {
  const message = new HealthReportMessage()
    .setStatus(report.status)
    .setService(report.service)
    .setTimestamp(report.timestamp)
    .setUptimeSeconds(report.uptimeSeconds)
    .setResponseTimeMs(report.responseTimeMs);

  Object.entries(report.checks).forEach(([name, check]) => {
    message.addChecks(
      new CheckResult()
        .setName(name)
        .setStatus(check.status)
        .setResponseTimeMs(check.responseTimeMs)
        .setDetails(check.details ?? ""),
    );
  });

  return message;
}

export function createHealthHandlers(options: { service: string; checks: () => HealthCheck[]; timeoutMs: number }): IHealthServer {
  return {
    check: withGrpcRequestLogging<HealthCheckRequest, HealthReportMessage>("health.check", (
      _call: ServerUnaryCall<HealthCheckRequest, HealthReportMessage>,
      callback: sendUnaryData<HealthReportMessage>,
    ) => {
      return runHealthChecks(options.checks(), { service: options.service, timeoutMs: options.timeoutMs }).then((report) => {
        callback(null, toHealthReportMessage(report));
      });
    }),
  };
}
