import { FastifyReply, FastifyRequest } from "fastify";
import { ListUsersService } from "../services/ListUsersService";

export async function listUsers(_request: FastifyRequest, reply: FastifyReply) {
  const listUsersService = new ListUsersService();

  const users = await listUsersService.execute();

  return reply.send(users);
}
