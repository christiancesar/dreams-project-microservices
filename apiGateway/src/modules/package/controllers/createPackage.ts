import { FastifyReply } from "fastify";
import { ZodRequest } from "../../../shared/http/types";
import { CreatePackageBody } from "../../../schemas/packages";
import CreatePackageService from "../services/packages/CreatePackageService";

export async function createPackage(request: ZodRequest<{ body: typeof CreatePackageBody }>, reply: FastifyReply) {
  const createPackageService = new CreatePackageService();

  const packageCreated = await createPackageService.execute(request.body);

  return reply.send(packageCreated);
}
