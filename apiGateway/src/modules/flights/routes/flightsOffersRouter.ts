import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { inject, injectable } from "tsyringe";
import { FASTIFY_INSTANCE } from "../../../shared/http/tokens";
import { HttpRouter } from "../../../shared/http/mountRouter";
import { AnyResponse, errorResponses } from "../../../schemas/common";
import { FlightOffersQuery } from "../../../schemas/flights";
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
        response: { 200: AnyResponse, ...errorResponses },
      },
    }, (request, reply) => this.flightsOffersController.index(request, reply));
  }
}
