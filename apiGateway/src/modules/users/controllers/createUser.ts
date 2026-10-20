import { type FastifyReply } from "fastify";
import { type ZodRequest } from "../../../shared/http/types.js";
import { CreateUserBody } from "../../../schemas/users.js";
import { CreateUserService } from "../services/CreateUserService.js";

export async function createUser(request: ZodRequest<{ body: typeof CreateUserBody }>, reply: FastifyReply) {
  const createUserService = new CreateUserService();

  const user = await createUserService.execute(request.body);

  return reply.send(user);
}
