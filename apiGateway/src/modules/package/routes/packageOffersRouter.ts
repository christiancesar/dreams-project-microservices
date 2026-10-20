import { z } from "zod";
import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { inject, injectable } from "tsyringe";
import { FASTIFY_INSTANCE } from "../../../shared/http/tokens";
import { HttpRouter } from "../../../shared/http/mountRouter";
import { errorResponses } from "../../../schemas/common";
import { PackageOffersQuery, PackageOfferResponse } from "../../../schemas/packages";
import PackageOffersController from "../controllers/PackageOffersController";

@injectable()
export class PackageOffersRouter implements HttpRouter {
  constructor(
    @inject(FASTIFY_INSTANCE) private server: FastifyInstance,
    private packageOffersController: PackageOffersController,
  ) {}

  register() {
    const app = this.server.withTypeProvider<ZodTypeProvider>();

    app.get('/', {
      schema: {
        tags: ['Pacotes'],
        summary: 'Monta ofertas de pacote (voo + hotel)',
        querystring: PackageOffersQuery,
        response: { 200: z.array(PackageOfferResponse), ...errorResponses },
      },
    }, (request, reply) => this.packageOffersController.index(request, reply));
  }
}
