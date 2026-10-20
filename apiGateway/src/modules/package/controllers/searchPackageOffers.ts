import { FastifyReply } from "fastify";
import { ZodRequest } from "../../../shared/http/types";
import { PackageOffersQuery } from "../../../schemas/packages";
import AssemblingPackageService from "../services/packageOffers/AssemblingPackageService";

export async function searchPackageOffers(request: ZodRequest<{ querystring: typeof PackageOffersQuery }>, reply: FastifyReply) {
  const assemblingPackageService = new AssemblingPackageService();

  const packages = await assemblingPackageService.execute(request.query);

  return reply.send(packages);
}
