import { FastifyReply } from "fastify";
import { injectable } from "tsyringe";
import { ZodRequest } from "../../../shared/http/types";
import { CreatePackageBody } from "../../../schemas/packages";
import CreatePackageService from "../services/packages/CreatePackageService";

@injectable()
class PackageControllers {

  async create(request: ZodRequest<{ body: typeof CreatePackageBody }>, reply: FastifyReply) {
    const createPackageService = new CreatePackageService();

    const packageCreated = await createPackageService.execute(request.body)

    return reply.send(packageCreated)
  }

}

export default PackageControllers
