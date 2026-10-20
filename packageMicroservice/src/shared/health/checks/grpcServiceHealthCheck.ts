import { ChannelCredentials, Metadata } from '@grpc/grpc-js';
import { HealthCheckRequest } from 'dreams-proto-sharing/src/contracts/health/health_pb.js';
import { HealthClient } from 'dreams-proto-sharing/src/contracts/health/health_grpc_pb.js';
import type { CheckStatus, HealthCheck } from '../healthCheck.js';

const knownStatuses: CheckStatus[] = ['ok', 'degraded', 'down'];

// Pergunta a outro serviço, por gRPC, como ele está. Se ele estiver fora, este serviço fica degraded.
export function createGrpcServiceHealthCheck(options: { name: string; address: string; timeoutMs: number }): HealthCheck {
  const client = new HealthClient(options.address, ChannelCredentials.createInsecure());

  return {
    name: options.name,
    run: () =>
      new Promise((resolve) => {
        // O deadline termina um pouco antes do timeout do framework, assim a falha vira degraded e não down.
        const deadline = Date.now() + Math.max(options.timeoutMs - 250, 100);

        client.check(new HealthCheckRequest(), new Metadata(), { deadline }, (error, report) => {
          if (error) {
            resolve({ status: 'degraded', details: `${options.address} unreachable: ${error.message}` });
            return;
          }

          const remoteStatus = report.getStatus();
          const status = knownStatuses.includes(remoteStatus as CheckStatus) ? (remoteStatus as CheckStatus) : 'degraded';

          resolve({ status, details: `${report.getService()} reported ${remoteStatus}` });
        });
      }),
  };
}
