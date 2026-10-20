import { z } from "zod";
import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { inject, injectable } from "tsyringe";
import { FASTIFY_INSTANCE } from "../../../shared/http/tokens";
import { HttpRouter } from "../../../shared/http/mountRouter";
import { errorResponses } from "../../../schemas/common";
import { FlightOffersQuery, FlightOfferResponse } from "../../../schemas/flights";
import FlightsOffersController from "../controllers/FlightsOffersController";

@injectable()
export class FlightsOffersRouter implements HttpRouter {
  constructor(
    @inject(FASTIFY_INSTANCE) private server: FastifyInstance,
    private flightsOffersController: FlightsOffersController,
  ) {}

  register() {
    const app = this.server.withTypeProvider<ZodTypeProvider>();

    app.get('/', {
      schema: {
        tags: ['Voos'],
        summary: 'Busca ofertas de voo',
        querystring: FlightOffersQuery,
        response: { 200: z.array(FlightOfferResponse), ...errorResponses },
      },
    }, (request, reply) => this.flightsOffersController.index(request, reply));
  }
}
