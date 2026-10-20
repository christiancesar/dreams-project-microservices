import { FastifyReply } from "fastify";
import { ZodRequest } from "../../../shared/http/types";
import { CreateUserBody } from "../../../schemas/users";
import { CreateUserService } from "../services/CreateUserService";

export async function createUser(request: ZodRequest<{ body: typeof CreateUserBody }>, reply: FastifyReply) {
  const createUserService = new CreateUserService();

  const user = await createUserService.execute(request.body);

  return reply.send(user);
}
