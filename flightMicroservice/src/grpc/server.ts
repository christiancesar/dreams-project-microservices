import { Server, ServerCredentials, type UntypedServiceImplementation } from "@grpc/grpc-js";
import { FlightsService } from "dreams-proto-sharing/src/contracts/flight/flight_grpc_pb.js";
import { HealthService } from "dreams-proto-sharing/src/contracts/health/health_grpc_pb.js";
import { promisify } from "util";
import FlightServiceProto from "../modules/protos/implementations/FlightServiceProto.js";
import { createApiHealthCheck } from "../shared/health/checks/apiHealthCheck.js";
import { type HealthCheck } from "../shared/health/healthCheck.js";
import { withGrpcRequestLogging } from "../shared/logging/grpcRequestLogger.js";
import { createHealthHandlers } from "./health/healthService.js";

type GrpcServerOptions = {
  service: string;
  extraHealthChecks: HealthCheck[];
  healthTimeoutMs: number;
};

// Servidor gRPC, a API deste serviço. Cada método do contrato passa pelo log de requisições.
export function createGrpcServer({ service, extraHealthChecks, healthTimeoutMs }: GrpcServerOptions) {
  const server = new Server();
  const implementation = new FlightServiceProto();

  let listening = false;

  const apiHealthCheck = createApiHealthCheck(() => listening);

  const handlers = Object.fromEntries(
    Object.keys(FlightsService).map((method) => {
      const handler = (implementation as unknown as Record<string, Parameters<typeof withGrpcRequestLogging>[1]>)[method];

      return [method, withGrpcRequestLogging(method, handler.bind(implementation))];
    }),
  );

  server.addService(FlightsService, handlers as UntypedServiceImplementation);

  server.addService(HealthService, createHealthHandlers({
    service,
    checks: () => [apiHealthCheck, ...extraHealthChecks],
    timeoutMs: healthTimeoutMs,
  }));

  const bind = promisify(server.bindAsync).bind(server);

  return {
    apiHealthCheck,

    async listen(address: string): Promise<number> {
      const port = await bind(address, ServerCredentials.createInsecure());
      listening = true;
      return port;
    },

    async shutdown(): Promise<void> {
      listening = false;
      await new Promise<void>((resolve) => server.tryShutdown(() => resolve()));
    },
  };
}
