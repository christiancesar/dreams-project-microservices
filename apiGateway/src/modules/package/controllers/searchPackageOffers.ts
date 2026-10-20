import { type FastifyReply } from "fastify";
import { type ZodRequest } from "../../../shared/http/types.js";
import { PackageOffersQuery } from "../../../schemas/packages.js";
import AssemblingPackageService from "../services/packageOffers/AssemblingPackageService.js";

export async function searchPackageOffers(request: ZodRequest<{ body: typeof PackageOffersQuery }>, reply: FastifyReply) {
  const assemblingPackageService = new AssemblingPackageService();

  const packages = await assemblingPackageService.execute(request.body);

  return reply.send(packages);
}
