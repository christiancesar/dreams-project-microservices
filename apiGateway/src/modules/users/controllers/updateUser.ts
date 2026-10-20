import { type FastifyReply } from "fastify";
import { type ZodRequest } from "../../../shared/http/types.js";
import { UpdateUserBody } from "../../../schemas/users.js";
import { UpdateUserService } from "../services/UpdateUserService.js";

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
