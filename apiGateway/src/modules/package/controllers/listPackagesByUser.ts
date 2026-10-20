import { FastifyReply } from "fastify";
import { ZodRequest } from "../../../shared/http/types";
import { PackageUserParams } from "../../../schemas/packages";
import ListPackagesByUserService from "../services/packageUser/ListPackagesByUserService";

export async function listPackagesByUser(request: ZodRequest<{ params: typeof PackageUserParams }>, reply: FastifyReply) {
  const listPackagesByUserService = new ListPackagesByUserService();

  const packages = await listPackagesByUserService.execute({ userId: request.params.userId });

  return reply.send(packages);
}
