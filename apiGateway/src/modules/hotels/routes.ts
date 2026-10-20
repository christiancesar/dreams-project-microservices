import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { errorResponses } from "../../schemas/common";
import { CreateHotelBody, HotelIdParams, HotelOfferResponse, HotelOffersQuery, HotelResponse, HotelUserParams } from "../../schemas/hotels";
import { createHotel } from "./controllers/createHotel";
import { listHotels } from "./controllers/listHotels";
import { listHotelsByUser } from "./controllers/listHotelsByUser";
import { searchHotelOffers } from "./controllers/searchHotelOffers";
import { showHotel } from "./controllers/showHotel";

async function hotelOffersRoutes(app: FastifyInstance) {
  const server = app.withTypeProvider<ZodTypeProvider>();

  server.get('/', {
    schema: {
      tags: ['Hotéis'],
      summary: 'Busca ofertas de hotel',
      querystring: HotelOffersQuery,
      response: { 200: z.array(HotelOfferResponse), ...errorResponses },
    },
  }, searchHotelOffers);
}

async function hotelUserRoutes(app: FastifyInstance) {
  const server = app.withTypeProvider<ZodTypeProvider>();

  server.get('/:userId', {
    schema: {
      tags: ['Hotéis'],
      summary: 'Lista os hotéis de um usuário',
      params: HotelUserParams,
      response: { 200: z.array(HotelResponse), ...errorResponses },
    },
  }, listHotelsByUser);
}

export default async function hotelsRoutes(app: FastifyInstance) {
  app.register(hotelOffersRoutes, { prefix: '/offers' });
  app.register(hotelUserRoutes, { prefix: '/user' });

  const server = app.withTypeProvider<ZodTypeProvider>();

  server.post('/', {
    schema: {
      tags: ['Hotéis'],
      summary: 'Registra um hotel para um usuário',
      body: CreateHotelBody,
      response: { 200: HotelResponse, ...errorResponses },
    },
  }, createHotel);

  server.get('/:hotelId', {
    schema: {
      tags: ['Hotéis'],
      summary: 'Mostra um hotel registrado',
      params: HotelIdParams,
      response: { 200: HotelResponse, ...errorResponses },
    },
  }, showHotel);

  server.get('/', {
    schema: {
      tags: ['Hotéis'],
      summary: 'Lista hotéis registrados',
      response: { 200: z.array(HotelResponse), ...errorResponses },
    },
  }, listHotels);
}
