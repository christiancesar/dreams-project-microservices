import { type FastifyReply } from "fastify";
import { type ZodRequest } from "../../../shared/http/types.js";
import { UserIdParams } from "../../../schemas/users.js";
import { ShowUserService } from "../services/ShowUserService.js";

export async function showUser(request: ZodRequest<{ params: typeof UserIdParams }>, reply: FastifyReply) {
  const showUserService = new ShowUserService();

  const user = await showUserService.execute({ userId: request.params.userId });

  return reply.send(user);
}
