import { FastifyInstance } from "fastify";
import flightsRouter from "./modules/flights/routes/flightsRouter";
import hotelsRouter from "./modules/hotels/routes/hotelRouter";
import packagesRouter from "./modules/package/routes/packageRouter";
import usersRouter from "./modules/users/routes/usersRouter";

export default async function routes(server: FastifyInstance) {
  server.register(usersRouter, { prefix: '/users' });

  server.register(flightsRouter, { prefix: '/flights' });

  server.register(hotelsRouter, { prefix: '/hotels' });

  server.register(packagesRouter, { prefix: '/packages' });
}
