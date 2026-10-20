import { z } from "zod";
import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { inject, injectable } from "tsyringe";
import { FASTIFY_INSTANCE } from "../../../shared/http/tokens";
import { HttpRouter, mountRouter } from "../../../shared/http/mountRouter";
import { errorResponses } from "../../../schemas/common";
import { CreatePackageBody, PackageResponse } from "../../../schemas/packages";
import PackageController from "../controllers/PackageController";
import { PackageOffersRouter } from "./packageOffersRouter";
import { PackageUserRouter } from "./packageUserRouter";

@injectable()
export class PackagesRouter implements HttpRouter {
  constructor(
    @inject(FASTIFY_INSTANCE) private server: FastifyInstance,
    private packageController: PackageController,
  ) {}

  register() {
    mountRouter(this.server, PackageOffersRouter, '/offers');
    mountRouter(this.server, PackageUserRouter, '/user');

    const app = this.server.withTypeProvider<ZodTypeProvider>();

    app.post('/', {
      schema: {
        tags: ['Pacotes'],
        summary: 'Cria um pacote (voo + hotel) para um usuário',
        body: CreatePackageBody,
        response: { 200: z.array(PackageResponse), ...errorResponses },
      },
    }, (request, reply) => this.packageController.create(request, reply));
  }
}
