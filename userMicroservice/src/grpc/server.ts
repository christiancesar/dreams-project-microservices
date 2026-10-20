import { Server, ServerCredentials } from "@grpc/grpc-js";
import { UsersService } from "dreams-proto-sharing/src/contracts/user/user_grpc_pb.js";
import { promisify } from "util";
import { UsersServer } from "../modules/protos/implementations/UserServiceProto.js";
import { type HealthCheck } from "../shared/health/healthCheck.js";
import { createApiHealthCheck } from "../shared/health/checks/apiHealthCheck.js";
import { withGrpcRequestLogging } from "../shared/logging/grpcRequestLogger.js";
import { HealthService } from "dreams-proto-sharing/src/contracts/health/health_grpc_pb.js";
import { createHealthHandlers } from "./health/healthService.js";

type GrpcServerOptions = {
  service: string;
  extraHealthChecks: HealthCheck[];
  healthTimeoutMs: number;
};

// Servidor gRPC, a API deste serviço. Cada método do contrato passa pelo log de requisições.
export function createGrpcServer({ service, extraHealthChecks, healthTimeoutMs }: GrpcServerOptions) {
  const server = new Server();
  const usersServer = new UsersServer();

  let listening = false;

  const apiHealthCheck = createApiHealthCheck(() => listening);

  server.addService(UsersService, {
    createUser: withGrpcRequestLogging("createUser", usersServer.createUser.bind(usersServer)),
    listUsers: withGrpcRequestLogging("listUsers", usersServer.listUsers.bind(usersServer)),
    showUser: withGrpcRequestLogging("showUser", usersServer.showUser.bind(usersServer)),
    updateUser: withGrpcRequestLogging("updateUser", usersServer.updateUser.bind(usersServer)),
  });

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
