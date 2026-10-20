import { type FastifyReply } from "fastify";
import { type ZodRequest } from "../../../shared/http/types.js";
import { CreatePackageBody } from "../../../schemas/packages.js";
import CreatePackageService from "../services/packages/CreatePackageService.js";

export async function createPackage(request: ZodRequest<{ body: typeof CreatePackageBody }>, reply: FastifyReply) {
  const createPackageService = new CreatePackageService();

  const packageCreated = await createPackageService.execute(request.body);

  return reply.send(packageCreated);
}
