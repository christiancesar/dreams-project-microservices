import { z } from "zod";
import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { inject, injectable } from "tsyringe";
import { FASTIFY_INSTANCE } from "../../../shared/http/tokens";
import { HttpRouter, mountRouter } from "../../../shared/http/mountRouter";
import { errorResponses } from "../../../schemas/common";
import { CreateFlightBody, FlightIdParams, FlightResponse } from "../../../schemas/flights";
import { FlightsController } from "../controllers/FlightsController";
import { FlightsOffersRouter } from "./flightsOffersRouter";
import { FlightsUserRouter } from "./flightsUserRouter";

@injectable()
export class FlightsRouter implements HttpRouter {
  constructor(
    @inject(FASTIFY_INSTANCE) private server: FastifyInstance,
    private flightsController: FlightsController,
  ) {}

  register() {
    mountRouter(this.server, FlightsOffersRouter, '/offers');
    mountRouter(this.server, FlightsUserRouter, '/user');

    const app = this.server.withTypeProvider<ZodTypeProvider>();

    app.get('/', {
      schema: {
        tags: ['Voos'],
        summary: 'Lista voos registrados',
        response: { 200: z.array(FlightResponse), ...errorResponses },
      },
    }, (_request, reply) => this.flightsController.index(reply));

    app.post('/', {
      schema: {
        tags: ['Voos'],
        summary: 'Registra um voo para um usuário',
        body: CreateFlightBody,
        response: { 200: FlightResponse, ...errorResponses },
      },
    }, (request, reply) => this.flightsController.create(request, reply));

    app.get('/:flightId', {
      schema: {
        tags: ['Voos'],
        summary: 'Mostra um voo registrado',
        params: FlightIdParams,
        response: { 200: FlightResponse, ...errorResponses },
      },
    }, (request, reply) => this.flightsController.show(request, reply));
  }
}
