import { randomUUID } from 'node:crypto';
import { type sendUnaryData, type ServerUnaryCall, status } from '@grpc/grpc-js';
import { logger } from '../logger/index.js';

type UnaryHandler<Req, Res> = (
  call: ServerUnaryCall<Req, Res>,
  callback: sendUnaryData<Res>,
) => Promise<void> | void;

// Envolve um handler unário do gRPC e registra chegada, tempo de resposta e status final.
// O corpo da requisição não é logado, porque traz dados pessoais (e-mail, data de nascimento).
export function withGrpcRequestLogging<Req, Res>(method: string, handler: UnaryHandler<Req, Res>) {
  return (call: ServerUnaryCall<Req, Res>, callback: sendUnaryData<Res>) => {
    const log = logger.child({ rpc: method, requestId: randomUUID(), peer: call.getPeer() });
    const startedAt = performance.now();

    log.info('gRPC request received');

    const finish: sendUnaryData<Res> = (error, value, trailer, flags) => {
      const durationMs = Number((performance.now() - startedAt).toFixed(2));
      const grpcStatus = error?.code ?? status.OK;

      if (grpcStatus === status.OK) {
        log.info({ grpcStatus, durationMs }, 'gRPC request completed');
      } else {
        log.warn({ grpcStatus, durationMs, errorMessage: error instanceof Error ? error.message : undefined }, 'gRPC request failed');
      }

      callback(error, value, trailer, flags);
    };

    Promise.resolve(handler(call, finish)).catch((err: unknown) => {
      log.error({ err }, 'gRPC handler threw without callback');
      finish(
        { code: status.INTERNAL, name: 'Internal', message: 'Internal Server Error', details: 'Internal Server Error' },
        null,
      );
    });
  };
}
