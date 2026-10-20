import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { AnyResponse, errorResponses } from "../../../schemas/common";
import { CreateFlightBody, FlightIdParams } from "../../../schemas/flights";
import { FlightsController } from "../controllers/FlightsController";
import flightsOffersRouter from "./flightsOffersRouter";
import flightsUserRouter from "./flightsUserRouter";

const flightsController = new FlightsController();

export default async function flightsRouter(server: FastifyInstance) {
  server.register(flightsOffersRouter, { prefix: '/offers' });
  server.register(flightsUserRouter, { prefix: '/user' });

  const app = server.withTypeProvider<ZodTypeProvider>();

  app.get('/', {
    schema: {
      tags: ['Voos'],
      summary: 'Lista voos registrados',
      response: { 200: AnyResponse, ...errorResponses },
    },
  }, (_request, reply) => flightsController.index(reply));

  app.post('/', {
    schema: {
      tags: ['Voos'],
      summary: 'Registra um voo para um usuário',
      body: CreateFlightBody,
      response: { 200: AnyResponse, ...errorResponses },
    },
  }, (request, reply) => flightsController.create(request.body, reply));

  app.get('/:flightId', {
    schema: {
      tags: ['Voos'],
      summary: 'Mostra um voo registrado',
      params: FlightIdParams,
      response: { 200: AnyResponse, ...errorResponses },
    },
  }, (request, reply) => flightsController.show(request.params, reply));
}
