import { FastifyReply } from "fastify";
import { ZodRequest } from "../../../shared/http/types";
import { UpdateUserBody } from "../../../schemas/users";
import { UpdateUserService } from "../services/UpdateUserService";

export async function updateUser(request: ZodRequest<{ body: typeof UpdateUserBody }>, reply: FastifyReply) {
  const updateUserService = new UpdateUserService();

  const user = await updateUserService.execute({
    id: request.body.id,
    firstname: request.body.firstname,
    lastname: request.body.lastname,
    birthday: request.body.birthday,
    age: request.body.age,
    email: request.body.email,
  });

  return reply.send(user);
}
