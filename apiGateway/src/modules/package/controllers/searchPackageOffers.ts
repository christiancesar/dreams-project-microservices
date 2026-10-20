import { FastifyReply } from "fastify";
import { ZodRequest } from "../../../shared/http/types";
import { PackageOffersQuery } from "../../../schemas/packages";
import AssemblingPackageService from "../services/packageOffers/AssemblingPackageService";

export async function searchPackageOffers(request: ZodRequest<{ body: typeof PackageOffersQuery }>, reply: FastifyReply) {
  const assemblingPackageService = new AssemblingPackageService();

  const packages = await assemblingPackageService.execute(request.body);

  return reply.send(packages);
}
