import cors from '@fastify/cors';
import fastifySwagger from '@fastify/swagger';
import scalarApiReference from '@scalar/fastify-api-reference';
import Fastify from 'fastify';
import { jsonSchemaTransform, serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod';
import interceptErrorMiddleware from './middlewares/interceptErrorMiddleware';
import routes from './routes';

const server = Fastify();

server.setValidatorCompiler(validatorCompiler);

server.setSerializerCompiler(serializerCompiler);

server.register(cors, {
  methods: ['GET', 'HEAD', 'POST', 'PATCH', 'QUERY'],
});

server.register(fastifySwagger, {
  openapi: {
    openapi: '3.1.0',
    info: {
      title: 'Dreams API Gateway',
      description: 'API pública do Dreams, que combina voos, hotéis, pacotes e usuários.',
      version: '1.0.0',
    },
    servers: [{ url: 'http://localhost:3333' }],
  },
  transform: jsonSchemaTransform,
});

server.register(scalarApiReference, {
  routePrefix: '/docs',
});

server.setErrorHandler(interceptErrorMiddleware);

server.register(routes);

async function main() {

  await server.listen({ port: 3333, host: '0.0.0.0' })
  console.log('Server listen on port 3333! 🍹')
  console.log('Documentação em http://localhost:3333/docs')
}

main()
  .catch(err => console.error(err))
