import { FastifyInstance } from "fastify";
import flightsRoutes from "./modules/flights/routes";
import hotelsRoutes from "./modules/hotels/routes";
import packagesRoutes from "./modules/package/routes";
import usersRoutes from "./modules/users/routes";

export default async function routes(server: FastifyInstance) {
  server.register(usersRoutes, { prefix: '/users' });
  server.register(flightsRoutes, { prefix: '/flights' });
  server.register(hotelsRoutes, { prefix: '/hotels' });
  server.register(packagesRoutes, { prefix: '/packages' });
}
