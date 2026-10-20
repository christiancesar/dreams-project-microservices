import { type FastifyReply } from "fastify";
import { type ZodRequest } from "../../../shared/http/types.js";
import { PackageUserParams } from "../../../schemas/packages.js";
import ListPackagesByUserService from "../services/packageUser/ListPackagesByUserService.js";

export async function listPackagesByUser(request: ZodRequest<{ params: typeof PackageUserParams }>, reply: FastifyReply) {
  const listPackagesByUserService = new ListPackagesByUserService();

  const packages = await listPackagesByUserService.execute({ userId: request.params.userId });

  return reply.send(packages);
}
