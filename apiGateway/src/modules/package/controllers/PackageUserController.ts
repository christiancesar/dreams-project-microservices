import { FastifyReply } from "fastify";
import { injectable } from "tsyringe";
import { ZodRequest } from "../../../shared/http/types";
import { PackageUserParams } from "../../../schemas/packages";
import ListPackagesByUserService from "../services/packageUser/ListPackagesByUserService";

@injectable()
class PackageUserController {
  async index(request: ZodRequest<{ params: typeof PackageUserParams }>, reply: FastifyReply) {
    const listPackagesByUserService = new ListPackagesByUserService();
    const packages = await listPackagesByUserService.execute({ userId: request.params.userId });
    return reply.send(packages)
  }
}

export default PackageUserController;
