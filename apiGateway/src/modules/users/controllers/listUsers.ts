import { type FastifyReply, type FastifyRequest } from "fastify";
import { ListUsersService } from "../services/ListUsersService.js";

export async function listUsers(_request: FastifyRequest, reply: FastifyReply) {
  const listUsersService = new ListUsersService();

  const users = await listUsersService.execute();

  return reply.send(users);
}
