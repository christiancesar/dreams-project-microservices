import { ChannelCredentials, Metadata } from '@grpc/grpc-js';
import { HealthCheckRequest, HealthReport as HealthReportMessage } from 'dreams-proto-sharing/src/contracts/health/health_pb.js';
import { HealthClient } from 'dreams-proto-sharing/src/contracts/health/health_grpc_pb.js';

export type RemoteHealthTarget = {
  name: string;
  address: string;
};

// Um alvo por serviço. O endereço vem do mesmo env usado pelo cliente de negócio.
export function createRemoteHealthTargets(): RemoteHealthTarget[] {
  return [
    { name: 'userMicroservice', address: process.env.USER_SERVICE_ADDRESS ?? '0.0.0.0:50052' },
    { name: 'flightMicroservice', address: process.env.FLIGHT_SERVICE_ADDRESS ?? '0.0.0.0:50053' },
    { name: 'hotelMicroservice', address: process.env.HOTEL_SERVICE_ADDRESS ?? '0.0.0.0:50054' },
    { name: 'packageMicroservice', address: process.env.PACKAGE_SERVICE_ADDRESS ?? '0.0.0.0:50051' },
  ];
}

// Chama Health.Check no serviço com deadline. Erro de rede é repassado para quem chamou, sem derrubar o gateway.
export function checkRemoteHealth(target: RemoteHealthTarget, timeoutMs: number): Promise<HealthReportMessage> {
  const client = new HealthClient(target.address, ChannelCredentials.createInsecure());

  return new Promise((resolve, reject) => {
    client.check(
      new HealthCheckRequest(),
      new Metadata(),
      { deadline: Date.now() + timeoutMs },
      (error: Error | null, report: HealthReportMessage) => {
        client.close();

        if (error) reject(error);
        else resolve(report);
      },
    );
  });
}
