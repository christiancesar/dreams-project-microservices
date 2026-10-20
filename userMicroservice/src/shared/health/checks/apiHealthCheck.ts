import type { HealthCheck } from '../healthCheck.js';

// Verifica se o servidor gRPC, que é a API deste serviço, está de pé.
export function createApiHealthCheck(isGrpcListening: () => boolean): HealthCheck {
  return {
    name: 'api',
    run: async () => {
      if (!isGrpcListening()) {
        return { status: 'down', details: 'gRPC server is not listening' };
      }

      return { status: 'ok', details: 'gRPC server listening' };
    },
  };
}
