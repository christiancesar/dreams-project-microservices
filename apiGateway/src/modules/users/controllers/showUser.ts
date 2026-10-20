import { FastifyReply } from "fastify";
import { ZodRequest } from "../../../shared/http/types";
import { UserIdParams } from "../../../schemas/users";
import { ShowUserService } from "../services/ShowUserService";

export async function showUser(request: ZodRequest<{ params: typeof UserIdParams }>, reply: FastifyReply) {
  const showUserService = new ShowUserService();

  const user = await showUserService.execute({ userId: request.params.userId });

  return reply.send(user);
}
