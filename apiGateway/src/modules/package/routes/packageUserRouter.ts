import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { AnyResponse, errorResponses } from "../../../schemas/common";
import { PackageUserParams } from "../../../schemas/packages";
import PackageUserController from "../controllers/PackageUserController";

const packageUserController = new PackageUserController();

export default async function packageUserRouter(server: FastifyInstance) {
  const app = server.withTypeProvider<ZodTypeProvider>();

  app.get('/:userId', {
    schema: {
      tags: ['Pacotes'],
      summary: 'Lista os pacotes de um usuário',
      params: PackageUserParams,
      response: { 200: AnyResponse, ...errorResponses },
    },
  }, (request, reply) => packageUserController.index(request.params, reply));
}
