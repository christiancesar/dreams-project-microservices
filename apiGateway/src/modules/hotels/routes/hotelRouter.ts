import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { inject, injectable } from "tsyringe";
import { FASTIFY_INSTANCE } from "../../../shared/http/tokens";
import { HttpRouter, mountRouter } from "../../../shared/http/mountRouter";
import { AnyResponse, errorResponses } from "../../../schemas/common";
import { CreateHotelBody, HotelIdParams } from "../../../schemas/hotels";
import HotelsController from "../controllers/HotelsController";
import { HotelsOffersRouter } from "./hotelsOffersRouter";
import { HotelUserRouter } from "./hotelUserRouter";

@injectable()
export class HotelsRouter implements HttpRouter {
  constructor(
    @inject(FASTIFY_INSTANCE) private server: FastifyInstance,
    private hotelsController: HotelsController,
  ) {}

  register() {
    mountRouter(this.server, HotelsOffersRouter, '/offers');
    mountRouter(this.server, HotelUserRouter, '/user');

    const app = this.server.withTypeProvider<ZodTypeProvider>();

    app.post('/', {
      schema: {
        tags: ['Hotéis'],
        summary: 'Registra um hotel para um usuário',
        body: CreateHotelBody,
        response: { 200: AnyResponse, ...errorResponses },
      },
    }, (request, reply) => this.hotelsController.create(request.body, reply));

    app.get('/:hotelId', {
      schema: {
        tags: ['Hotéis'],
        summary: 'Mostra um hotel registrado',
        params: HotelIdParams,
        response: { 200: AnyResponse, ...errorResponses },
      },
    }, (request, reply) => this.hotelsController.show(request.params, reply));

    app.get('/', {
      schema: {
        tags: ['Hotéis'],
        summary: 'Lista hotéis registrados',
        response: { 200: AnyResponse, ...errorResponses },
      },
    }, (_request, reply) => this.hotelsController.index(reply));
  }
}
