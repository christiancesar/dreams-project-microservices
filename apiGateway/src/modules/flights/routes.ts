import { type FastifyInstance } from "fastify";
import { type ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { errorResponses } from "../../schemas/common.js";
import { CreateFlightBody, FlightIdParams, FlightOffersQuery, FlightResponse, FlightOfferResponse, FlightUserParams } from "../../schemas/flights.js";
import { createFlight } from "./controllers/createFlight.js";
import { listFlights } from "./controllers/listFlights.js";
import { listFlightsByUser } from "./controllers/listFlightsByUser.js";
import { searchFlightOffers } from "./controllers/searchFlightOffers.js";
import { showFlight } from "./controllers/showFlight.js";

async function flightOffersRoutes(app: FastifyInstance) {
  const server = app.withTypeProvider<ZodTypeProvider>();

  server.route({
    method: 'QUERY',
    url: '/',
    schema: {
      tags: ['Voos'],
      summary: 'Busca ofertas de voo',
      body: FlightOffersQuery,
      response: { 200: z.array(FlightOfferResponse), ...errorResponses },
    },
    handler: searchFlightOffers,
  });
}

async function flightUserRoutes(app: FastifyInstance) {
  const server = app.withTypeProvider<ZodTypeProvider>();

  server.get('/:userId', {
    schema: {
      tags: ['Voos'],
      summary: 'Lista os voos de um usuário',
      params: FlightUserParams,
      response: { 200: z.array(FlightResponse), ...errorResponses },
    },
  }, listFlightsByUser);
}

export default async function flightsRoutes(app: FastifyInstance) {
  app.register(flightOffersRoutes, { prefix: '/offers' });
  app.register(flightUserRoutes, { prefix: '/user' });

  const server = app.withTypeProvider<ZodTypeProvider>();

  server.get('/', {
    schema: {
      tags: ['Voos'],
      summary: 'Lista voos registrados',
      response: { 200: z.array(FlightResponse), ...errorResponses },
    },
  }, listFlights);

  server.post('/', {
    schema: {
      tags: ['Voos'],
      summary: 'Registra um voo para um usuário',
      body: CreateFlightBody,
      response: { 200: FlightResponse, ...errorResponses },
    },
  }, createFlight);

  server.get('/:flightId', {
    schema: {
      tags: ['Voos'],
      summary: 'Mostra um voo registrado',
      params: FlightIdParams,
      response: { 200: FlightResponse, ...errorResponses },
    },
  }, showFlight);
}
