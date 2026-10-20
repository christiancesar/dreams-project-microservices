import { FastifyReply } from "fastify";
import { PackageUserParams } from "../../../schemas/packages";
import ListPackagesByUserService from "../services/packageUser/ListPackagesByUserService";

class PackageUserController {
  async index(params: PackageUserParams, reply: FastifyReply) {
    const listPackagesByUserService = new ListPackagesByUserService();
    const packages = await listPackagesByUserService.execute({ userId: params.userId });
    return reply.send(packages)
  }
}

export default PackageUserController;
