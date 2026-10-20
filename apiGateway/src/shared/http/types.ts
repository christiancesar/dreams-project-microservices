import { FastifyRequest, FastifySchema, RawRequestDefaultExpression, RawServerDefault, RouteGenericInterface } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";

// FastifyRequest tipado pelo schema da rota: body, params e querystring vêm do Zod.
export type ZodRequest<Schema extends FastifySchema> = FastifyRequest<
  RouteGenericInterface,
  RawServerDefault,
  RawRequestDefaultExpression,
  Schema,
  ZodTypeProvider
>;
