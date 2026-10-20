import { z } from "zod";
import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { inject, injectable } from "tsyringe";
import { FASTIFY_INSTANCE } from "../../../shared/http/tokens";
import { HttpRouter } from "../../../shared/http/mountRouter";
import { errorResponses } from "../../../schemas/common";
import { HotelOfferResponse } from "../../../schemas/hotels";
import { HotelOffersQuery } from "../../../schemas/hotels";
import { HotelOffersController } from "../controllers/HotelOffersController";

@injectable()
export class HotelsOffersRouter implements HttpRouter {
  constructor(
    @inject(FASTIFY_INSTANCE) private server: FastifyInstance,
    private hotelOffersController: HotelOffersController,
  ) {}

  register() {
    const app = this.server.withTypeProvider<ZodTypeProvider>();

    app.get('/', {
      schema: {
        tags: ['Hotéis'],
        summary: 'Busca ofertas de hotel',
        querystring: HotelOffersQuery,
        response: { 200: z.array(HotelOfferResponse), ...errorResponses },
      },
    }, (request, reply) => this.hotelOffersController.index(request, reply));
  }
}
