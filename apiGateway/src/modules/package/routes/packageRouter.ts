import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { AnyResponse, errorResponses } from "../../../schemas/common";
import { CreatePackageBody } from "../../../schemas/packages";
import PackageController from "../controllers/PackageController";
import packageOffersRouter from "./packageOffersRouter";
import packageUserRouter from "./packageUserRouter";

const packageController = new PackageController();

export default async function packageRouter(server: FastifyInstance) {
  server.register(packageOffersRouter, { prefix: '/offers' });

  server.register(packageUserRouter, { prefix: '/user' });

  const app = server.withTypeProvider<ZodTypeProvider>();

  app.post('/', {
    schema: {
      tags: ['Pacotes'],
      summary: 'Cria um pacote (voo + hotel) para um usuário',
      body: CreatePackageBody,
      response: { 200: AnyResponse, ...errorResponses },
    },
  }, (request, reply) => packageController.create(request.body, reply));
}
