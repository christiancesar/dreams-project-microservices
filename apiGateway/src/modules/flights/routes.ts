import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { errorResponses } from "../../schemas/common";
import { CreateFlightBody, FlightIdParams, FlightOffersQuery, FlightResponse, FlightOfferResponse, FlightUserParams } from "../../schemas/flights";
import { createFlight } from "./controllers/createFlight";
import { listFlights } from "./controllers/listFlights";
import { listFlightsByUser } from "./controllers/listFlightsByUser";
import { searchFlightOffers } from "./controllers/searchFlightOffers";
import { showFlight } from "./controllers/showFlight";

async function flightOffersRoutes(app: FastifyInstance) {
  const server = app.withTypeProvider<ZodTypeProvider>();

  server.get('/', {
    schema: {
      tags: ['Voos'],
      summary: 'Busca ofertas de voo',
      querystring: FlightOffersQuery,
      response: { 200: z.array(FlightOfferResponse), ...errorResponses },
    },
  }, searchFlightOffers);
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
