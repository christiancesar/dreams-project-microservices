import { z } from "zod";

export const HealthStatus = z.enum(["ok", "degraded", "down"]).describe("ok: funcionando. degraded: parte dos recursos com problema. down: não atende.");

export const CheckReportSchema = z.object({
  status: HealthStatus,
  responseTimeMs: z.number().describe("Tempo gasto para verificar este recurso, em ms"),
  details: z.string().optional().describe("Descrição curta do resultado"),
}).describe("Resultado de uma verificação de recurso (banco, gRPC, dependência...)");

export const HealthReportSchema = z.object({
  status: HealthStatus,
  service: z.string().describe("Nome do serviço que gerou o relatório"),
  timestamp: z.string().describe("Momento da verificação, ISO 8601"),
  uptimeSeconds: z.number().describe("Tempo desde que o processo subiu, em segundos"),
  responseTimeMs: z.number().describe("Tempo total da verificação, em ms"),
  checks: z.record(z.string(), CheckReportSchema).describe("Recursos do serviço, por nome"),
}).describe("Relatório de saúde de um serviço");

export const ServiceHealthSchema = CheckReportSchema.extend({
  report: HealthReportSchema.optional().describe("Relatório completo do serviço, quando ele respondeu"),
}).describe("Saúde de um microsserviço consultado pelo gateway, via gRPC");

export const GatewayHealthSchema = HealthReportSchema.extend({
  services: z.record(z.string(), ServiceHealthSchema).describe("Microsserviços consultados por gRPC, por nome"),
}).describe("Relatório agregado: gateway e todos os microsserviços");
