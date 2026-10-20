import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { inject, injectable } from "tsyringe";
import { FASTIFY_INSTANCE } from "../../../shared/http/tokens";
import { HttpRouter } from "../../../shared/http/mountRouter";
import { AnyResponse, errorResponses } from "../../../schemas/common";
import { FlightUserParams } from "../../../schemas/flights";
import FlightsUserController from "../controllers/FlightsUserController";

@injectable()
export class FlightsUserRouter implements HttpRouter {
  constructor(
    @inject(FASTIFY_INSTANCE) private server: FastifyInstance,
    private flightsUserController: FlightsUserController,
  ) {}

  register() {
    const app = this.server.withTypeProvider<ZodTypeProvider>();

    app.get('/:userId', {
      schema: {
        tags: ['Voos'],
        summary: 'Lista os voos de um usuário',
        params: FlightUserParams,
        response: { 200: AnyResponse, ...errorResponses },
      },
    }, (request, reply) => this.flightsUserController.index(request.params, reply));
  }
}
