import { type FastifyInstance } from "fastify";
import { type ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { errorResponses } from "../../schemas/common.js";
import { CreateUserBody, UpdateUserBody, UserIdParams, UserResponse } from "../../schemas/users.js";
import { createUser } from "./controllers/createUser.js";
import { listUsers } from "./controllers/listUsers.js";
import { showUser } from "./controllers/showUser.js";
import { updateUser } from "./controllers/updateUser.js";

export default async function usersRoutes(app: FastifyInstance) {
  const server = app.withTypeProvider<ZodTypeProvider>();

  server.post('/', {
    schema: {
      tags: ['Usuários'],
      summary: 'Cria um usuário',
      body: CreateUserBody,
      response: { 200: z.array(UserResponse), ...errorResponses },
    },
  }, createUser);

  server.get('/', {
    schema: {
      tags: ['Usuários'],
      summary: 'Lista usuários',
      response: { 200: z.array(UserResponse), ...errorResponses },
    },
  }, listUsers);

  server.get('/:userId', {
    schema: {
      tags: ['Usuários'],
      summary: 'Mostra um usuário',
      params: UserIdParams,
      response: { 200: z.array(UserResponse), ...errorResponses },
    },
  }, showUser);

  server.patch('/', {
    schema: {
      tags: ['Usuários'],
      summary: 'Atualiza um usuário',
      body: UpdateUserBody,
      response: { 200: z.array(UserResponse), ...errorResponses },
    },
  }, updateUser);
}
