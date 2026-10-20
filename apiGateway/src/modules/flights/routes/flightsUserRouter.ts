import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { AnyResponse, errorResponses } from "../../../schemas/common";
import { FlightUserParams } from "../../../schemas/flights";
import FlightsUserController from "../controllers/FlightsUserController";

const flightsUserController = new FlightsUserController();

export default async function flightsUserRouter(server: FastifyInstance) {
  const app = server.withTypeProvider<ZodTypeProvider>();

  app.get('/:userId', {
    schema: {
      tags: ['Voos'],
      summary: 'Lista os voos de um usuário',
      params: FlightUserParams,
      response: { 200: AnyResponse, ...errorResponses },
    },
  }, (request, reply) => flightsUserController.index(request.params, reply));
}
