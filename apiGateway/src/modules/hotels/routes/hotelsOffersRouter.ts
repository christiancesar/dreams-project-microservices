import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { AnyResponse, errorResponses } from "../../../schemas/common";
import { HotelOffersQuery } from "../../../schemas/hotels";
import { HotelOffersController } from "../controllers/HotelOffersController";

const hotelOffersController = new HotelOffersController();

export default async function hotelsOffersRouter(server: FastifyInstance) {
  const app = server.withTypeProvider<ZodTypeProvider>();

  app.get('/', {
    schema: {
      tags: ['Hotéis'],
      summary: 'Busca ofertas de hotel',
      querystring: HotelOffersQuery,
      response: { 200: AnyResponse, ...errorResponses },
    },
  }, (request, reply) => hotelOffersController.index(request.query, reply));
}
