import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { AnyResponse, errorResponses } from "../../../schemas/common";
import { CreateUserBody, UpdateUserBody, UserIdParams } from "../../../schemas/users";
import { UsersControllers } from "../controllers/UsersControllers";

const usersControllers = new UsersControllers();

export default async function usersRouter(server: FastifyInstance) {
  const app = server.withTypeProvider<ZodTypeProvider>();

  app.post('/', {
    schema: {
      tags: ['Usuários'],
      summary: 'Cria um usuário',
      body: CreateUserBody,
      response: { 200: AnyResponse, ...errorResponses },
    },
  }, (request, reply) => usersControllers.create(request.body, reply));

  app.get('/', {
    schema: {
      tags: ['Usuários'],
      summary: 'Lista usuários',
      response: { 200: AnyResponse, ...errorResponses },
    },
  }, (_request, reply) => usersControllers.index(reply));

  app.get('/:userId', {
    schema: {
      tags: ['Usuários'],
      summary: 'Mostra um usuário',
      params: UserIdParams,
      response: { 200: AnyResponse, ...errorResponses },
    },
  }, (request, reply) => usersControllers.show(request.params, reply));

  app.patch('/', {
    schema: {
      tags: ['Usuários'],
      summary: 'Atualiza um usuário',
      body: UpdateUserBody,
      response: { 200: AnyResponse, ...errorResponses },
    },
  }, (request, reply) => usersControllers.update(request.body, reply));
}
