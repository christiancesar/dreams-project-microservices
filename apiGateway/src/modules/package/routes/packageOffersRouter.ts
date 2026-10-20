import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { AnyResponse, errorResponses } from "../../../schemas/common";
import { PackageOffersQuery } from "../../../schemas/packages";
import PackageOffersController from "../controllers/PackageOffersController";

const packageOffersController = new PackageOffersController();

export default async function packageOffersRouter(server: FastifyInstance) {
  const app = server.withTypeProvider<ZodTypeProvider>();

  app.get('/', {
    schema: {
      tags: ['Pacotes'],
      summary: 'Monta ofertas de pacote (voo + hotel)',
      querystring: PackageOffersQuery,
      response: { 200: AnyResponse, ...errorResponses },
    },
  }, (request, reply) => packageOffersController.index(request.query, reply));
}
