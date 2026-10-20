import { FastifyReply } from "fastify";
import { injectable } from "tsyringe";
import { ZodRequest } from "../../../shared/http/types";
import { CreateUserBody, UpdateUserBody, UserIdParams } from "../../../schemas/users";
import { CreateUserService } from "../services/CreateUserService";
import { ListUsersService } from "../services/ListUsersService";
import { ShowUserService } from "../services/ShowUserService";
import { UpdateUserService } from '../services/UpdateUserService';

@injectable()
export class UsersControllers {

  async create(request: ZodRequest<{ body: typeof CreateUserBody }>, reply: FastifyReply) {
    const createUserService = new CreateUserService();

    const user = await createUserService.execute(request.body)

    return reply.send(user)
  }

  async index(reply: FastifyReply) {
    const listUsersService = new ListUsersService();

    const users = await listUsersService.execute()

    return reply.send(users)
  }

  async show(request: ZodRequest<{ params: typeof UserIdParams }>, reply: FastifyReply) {
    const showUserService = new ShowUserService();

    const user = await showUserService.execute({ userId: request.params.userId })

    return reply.send(user)
  }

  async update(request: ZodRequest<{ body: typeof UpdateUserBody }>, reply: FastifyReply) {
    const updateUserService = new UpdateUserService();

    const user = await updateUserService.execute({
      id: request.body.id,
      firstname: request.body.firstname,
      lastname: request.body.lastname,
      birthday: request.body.birthday,
      age: request.body.age,
      email: request.body.email,
    })

    return reply.send(user)
  }
}
