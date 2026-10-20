import { FastifyReply } from "fastify";
import { ZodRequest } from "../../../shared/http/types";
import { CreateFlightBody } from "../../../schemas/flights";
import CreateFlightService from "../services/flights/CreateFlightService";

export async function createFlight(request: ZodRequest<{ body: typeof CreateFlightBody }>, reply: FastifyReply) {
  const createFlightService = new CreateFlightService();

  const flight = await createFlightService.execute(request.body);

  return reply.send(flight);
}
