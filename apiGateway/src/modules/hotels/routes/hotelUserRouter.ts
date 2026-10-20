import { z } from "zod";
import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { inject, injectable } from "tsyringe";
import { FASTIFY_INSTANCE } from "../../../shared/http/tokens";
import { HttpRouter } from "../../../shared/http/mountRouter";
import { errorResponses } from "../../../schemas/common";
import { HotelResponse } from "../../../schemas/hotels";
import { HotelUserParams } from "../../../schemas/hotels";
import HotelUserController from "../controllers/HotelUserController";

@injectable()
export class HotelUserRouter implements HttpRouter {
  constructor(
    @inject(FASTIFY_INSTANCE) private server: FastifyInstance,
    private hotelUserController: HotelUserController,
  ) {}

  register() {
    const app = this.server.withTypeProvider<ZodTypeProvider>();

    app.get('/:userId', {
      schema: {
        tags: ['Hotéis'],
        summary: 'Lista os hotéis de um usuário',
        params: HotelUserParams,
        response: { 200: z.array(HotelResponse), ...errorResponses },
      },
    }, (request, reply) => this.hotelUserController.index(request, reply));
  }
}
