import { z } from "zod";
import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { inject, injectable } from "tsyringe";
import { FASTIFY_INSTANCE } from "../../../shared/http/tokens";
import { HttpRouter } from "../../../shared/http/mountRouter";
import { errorResponses } from "../../../schemas/common";
import { UserResponse } from "../../../schemas/users";
import { CreateUserBody, UpdateUserBody, UserIdParams } from "../../../schemas/users";
import { UsersControllers } from "../controllers/UsersControllers";

@injectable()
export class UsersRouter implements HttpRouter {
  constructor(
    @inject(FASTIFY_INSTANCE) private server: FastifyInstance,
    private usersControllers: UsersControllers,
  ) {}

  register() {
    const app = this.server.withTypeProvider<ZodTypeProvider>();

    app.post('/', {
      schema: {
        tags: ['Usuários'],
        summary: 'Cria um usuário',
        body: CreateUserBody,
        response: { 200: z.array(UserResponse), ...errorResponses },
      },
    }, (request, reply) => this.usersControllers.create(request, reply));

    app.get('/', {
      schema: {
        tags: ['Usuários'],
        summary: 'Lista usuários',
        response: { 200: z.array(UserResponse), ...errorResponses },
      },
    }, (_request, reply) => this.usersControllers.index(reply));

    app.get('/:userId', {
      schema: {
        tags: ['Usuários'],
        summary: 'Mostra um usuário',
        params: UserIdParams,
        response: { 200: z.array(UserResponse), ...errorResponses },
      },
    }, (request, reply) => this.usersControllers.show(request, reply));

    app.patch('/', {
      schema: {
        tags: ['Usuários'],
        summary: 'Atualiza um usuário',
        body: UpdateUserBody,
        response: { 200: z.array(UserResponse), ...errorResponses },
      },
    }, (request, reply) => this.usersControllers.update(request, reply));
  }
}
