import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { inject, injectable } from "tsyringe";
import { FASTIFY_INSTANCE } from "../../../shared/http/tokens";
import { HttpRouter } from "../../../shared/http/mountRouter";
import { AnyResponse, errorResponses } from "../../../schemas/common";
import { PackageUserParams } from "../../../schemas/packages";
import PackageUserController from "../controllers/PackageUserController";

@injectable()
export class PackageUserRouter implements HttpRouter {
  constructor(
    @inject(FASTIFY_INSTANCE) private server: FastifyInstance,
    private packageUserController: PackageUserController,
  ) {}

  register() {
    const app = this.server.withTypeProvider<ZodTypeProvider>();

    app.get('/:userId', {
      schema: {
        tags: ['Pacotes'],
        summary: 'Lista os pacotes de um usuário',
        params: PackageUserParams,
        response: { 200: AnyResponse, ...errorResponses },
      },
    }, (request, reply) => this.packageUserController.index(request.params, reply));
  }
}
