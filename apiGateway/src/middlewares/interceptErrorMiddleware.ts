import { FastifyReply, FastifyRequest } from "fastify";
import AppError from '../errors/AppError';

export default function interceptErrorMiddleware(
  err: Error,
  request: FastifyRequest,
  reply: FastifyReply,
) {
  if (err instanceof AppError) {
    return reply.status(err.statusCode).send({
      status: 'error',
      code: err.code,
      message: err.message,
    });
  }

  if ('validation' in err) {
    return reply.status(400).send({
      status: 'error',
      message: err.message,
    });
  }

  console.error(err);

  return reply.status(500).send({
    status: 'error',
    message: 'Internal server error',
  })
}
