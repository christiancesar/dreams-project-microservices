import { injectable } from "tsyringe";
import { FastifyReply } from "fastify";
import { CreateUserBody, UpdateUserBody, UserIdParams } from "../../../schemas/users";
import { CreateUserService } from "../services/CreateUserService";
import { ListUsersService } from "../services/ListUsersService";
import { ShowUserService } from "../services/ShowUserService";
import { UpdateUserService } from '../services/UpdateUserService';

@injectable()
export class UsersControllers {

  async create(body: CreateUserBody, reply: FastifyReply) {
    const createUserService = new CreateUserService();

    const user = await createUserService.execute(body)

    return reply.send(user)
  }

  async index(reply: FastifyReply) {
    const listUsersService = new ListUsersService();

    const users = await listUsersService.execute()

    return reply.send(users)
  }

  async show(params: UserIdParams, reply: FastifyReply) {
    const showUserService = new ShowUserService();

    const user = await showUserService.execute({ userId: params.userId })

    return reply.send(user)
  }

  async update(body: UpdateUserBody, reply: FastifyReply) {
    const updateUserService = new UpdateUserService();

    const user = await updateUserService.execute({
      id: body.id,
      firstname: body.firstname,
      lastname: body.lastname,
      birthday: body.birthday,
      age: body.age,
      email: body.email,
    })

    return reply.send(user)
  }
}
