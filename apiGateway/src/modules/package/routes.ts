import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { errorResponses } from "../../schemas/common";
import { CreatePackageBody, PackageOfferResponse, PackageOffersQuery, PackageResponse, PackageUserParams } from "../../schemas/packages";
import { createPackage } from "./controllers/createPackage";
import { listPackagesByUser } from "./controllers/listPackagesByUser";
import { searchPackageOffers } from "./controllers/searchPackageOffers";

async function packageOffersRoutes(app: FastifyInstance) {
  const server = app.withTypeProvider<ZodTypeProvider>();

  server.route({
    method: 'QUERY',
    url: '/',
    schema: {
      tags: ['Pacotes'],
      summary: 'Monta ofertas de pacote (voo + hotel)',
      body: PackageOffersQuery,
      response: { 200: z.array(PackageOfferResponse), ...errorResponses },
    },
    handler: searchPackageOffers,
  });
}

async function packageUserRoutes(app: FastifyInstance) {
  const server = app.withTypeProvider<ZodTypeProvider>();

  server.get('/:userId', {
    schema: {
      tags: ['Pacotes'],
      summary: 'Lista os pacotes de um usuário',
      params: PackageUserParams,
      response: { 200: z.array(PackageResponse), ...errorResponses },
    },
  }, listPackagesByUser);
}

export default async function packagesRoutes(app: FastifyInstance) {
  app.register(packageOffersRoutes, { prefix: '/offers' });
  app.register(packageUserRoutes, { prefix: '/user' });

  const server = app.withTypeProvider<ZodTypeProvider>();

  server.post('/', {
    schema: {
      tags: ['Pacotes'],
      summary: 'Cria um pacote (voo + hotel) para um usuário',
      body: CreatePackageBody,
      response: { 200: z.array(PackageResponse), ...errorResponses },
    },
  }, createPackage);
}
