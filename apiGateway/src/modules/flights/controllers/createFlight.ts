import { type FastifyReply } from "fastify";
import { type ZodRequest } from "../../../shared/http/types.js";
import { CreateFlightBody } from "../../../schemas/flights.js";
import CreateFlightService from "../services/flights/CreateFlightService.js";

export async function createFlight(request: ZodRequest<{ body: typeof CreateFlightBody }>, reply: FastifyReply) {
  const createFlightService = new CreateFlightService();

  const flight = await createFlightService.execute(request.body);

  return reply.send(flight);
}
