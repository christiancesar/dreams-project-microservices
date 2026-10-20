import { prisma } from '../../../../prisma/index.js';
import type { HealthCheck } from '../healthCheck.js';

// Envia um ping ao MongoDB pelo Prisma.
export const databaseHealthCheck: HealthCheck = {
  name: 'database',
  run: async () => {
    await prisma.$runCommandRaw({ ping: 1 });

    return { status: 'ok', details: 'MongoDB responded to ping' };
  },
};
