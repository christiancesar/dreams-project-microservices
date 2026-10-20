import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { AnyResponse, errorResponses } from "../../../schemas/common";
import { FlightOffersQuery } from "../../../schemas/flights";
import FlightsOffersController from "../controllers/FlightsOffersController";

const flightsOffersController = new FlightsOffersController();

export default async function flightsOffersRouter(server: FastifyInstance) {
  const app = server.withTypeProvider<ZodTypeProvider>();

  app.get('/', {
    schema: {
      tags: ['Voos'],
      summary: 'Busca ofertas de voo',
      querystring: FlightOffersQuery,
      response: { 200: AnyResponse, ...errorResponses },
    },
  }, (request, reply) => flightsOffersController.index(request.query, reply));
}
