import { type FastifyInstance } from "fastify";
import flightsRoutes from "./modules/flights/routes.js";
import hotelsRoutes from "./modules/hotels/routes.js";
import packagesRoutes from "./modules/package/routes.js";
import usersRoutes from "./modules/users/routes.js";
import healthRoutes from "./modules/health/routes.js";

export default async function routes(server: FastifyInstance) {
  server.register(usersRoutes, { prefix: '/users' });
  server.register(flightsRoutes, { prefix: '/flights' });
  server.register(hotelsRoutes, { prefix: '/hotels' });
  server.register(packagesRoutes, { prefix: '/packages' });
  server.register(healthRoutes);
}
