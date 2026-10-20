import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { AnyResponse, errorResponses } from "../../../schemas/common";
import { HotelUserParams } from "../../../schemas/hotels";
import HotelUserController from "../controllers/HotelUserController";

const hotelUserController = new HotelUserController();

export default async function hotelUserRouter(server: FastifyInstance) {
  const app = server.withTypeProvider<ZodTypeProvider>();

  app.get('/:userId', {
    schema: {
      tags: ['Hotéis'],
      summary: 'Lista os hotéis de um usuário',
      params: HotelUserParams,
      response: { 200: AnyResponse, ...errorResponses },
    },
  }, (request, reply) => hotelUserController.index(request.params, reply));
}
