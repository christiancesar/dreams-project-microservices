import { injectable } from "tsyringe";
import { FastifyReply } from "fastify";
import { CreatePackageBody } from "../../../schemas/packages";
import CreatePackageService from "../services/packages/CreatePackageService";

@injectable()
class PackageControllers {

  async create(body: CreatePackageBody, reply: FastifyReply) {
    const createPackageService = new CreatePackageService();

    const packageCreated = await createPackageService.execute(body)

    return reply.send(packageCreated)
  }

}

export default PackageControllers
