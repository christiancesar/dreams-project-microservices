import { FastifyReply } from "fastify";
import { PackageOffersQuery } from "../../../schemas/packages";
import AssemblingPackageService from "../services/packageOffers/AssemblingPackageService";

export default class PackageOffersControllers {

  async index(query: PackageOffersQuery, reply: FastifyReply) {
    const assemblingPackageService = new AssemblingPackageService();

    const packages = await assemblingPackageService.execute(query)

    return reply.send(packages)
  }
}
