import { FastifyInstance } from "fastify";
import { mountRouter } from "./shared/http/mountRouter";
import { FlightsRouter } from "./modules/flights/routes/flightsRouter";
import { HotelsRouter } from "./modules/hotels/routes/hotelRouter";
import { PackagesRouter } from "./modules/package/routes/packageRouter";
import { UsersRouter } from "./modules/users/routes/usersRouter";

export function registerRoutes(server: FastifyInstance) {
  mountRouter(server, UsersRouter, '/users');
  mountRouter(server, FlightsRouter, '/flights');
  mountRouter(server, HotelsRouter, '/hotels');
  mountRouter(server, PackagesRouter, '/packages');
}
