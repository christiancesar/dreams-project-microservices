import { type FastifyRequest, type FastifySchema, type RawRequestDefaultExpression, type RawServerDefault, type RouteGenericInterface } from "fastify";
import { type ZodTypeProvider } from "fastify-type-provider-zod";

// FastifyRequest tipado pelo schema da rota: body, params e querystring vêm do Zod.
export type ZodRequest<Schema extends FastifySchema> = FastifyRequest<
  RouteGenericInterface,
  RawServerDefault,
  RawRequestDefaultExpression,
  Schema,
  ZodTypeProvider
>;
