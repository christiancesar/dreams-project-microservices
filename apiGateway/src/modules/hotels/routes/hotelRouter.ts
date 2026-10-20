import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { AnyResponse, errorResponses } from "../../../schemas/common";
import { CreateHotelBody, HotelIdParams } from "../../../schemas/hotels";
import HotelsController from "../controllers/HotelsController";
import hotelsOffersRouter from "./hotelsOffersRouter";
import hotelUserRouter from "./hotelUserRouter";

const hotelsController = new HotelsController();

export default async function hotelRouter(server: FastifyInstance) {
  server.register(hotelsOffersRouter, { prefix: '/offers' });
  server.register(hotelUserRouter, { prefix: '/user' });

  const app = server.withTypeProvider<ZodTypeProvider>();

  app.post('/', {
    schema: {
      tags: ['Hotéis'],
      summary: 'Registra um hotel para um usuário',
      body: CreateHotelBody,
      response: { 200: AnyResponse, ...errorResponses },
    },
  }, (request, reply) => hotelsController.create(request.body, reply));

  app.get('/:hotelId', {
    schema: {
      tags: ['Hotéis'],
      summary: 'Mostra um hotel registrado',
      params: HotelIdParams,
      response: { 200: AnyResponse, ...errorResponses },
    },
  }, (request, reply) => hotelsController.show(request.params, reply));

  app.get('/', {
    schema: {
      tags: ['Hotéis'],
      summary: 'Lista hotéis registrados',
      response: { 200: AnyResponse, ...errorResponses },
    },
  }, (_request, reply) => hotelsController.index(reply));
}
