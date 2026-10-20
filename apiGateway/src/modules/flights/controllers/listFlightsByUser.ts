import { type FastifyReply } from "fastify";
import { type ZodRequest } from "../../../shared/http/types.js";
import { FlightUserParams } from "../../../schemas/flights.js";
import ListFlightsByUserService from "../services/FlightUser/ListFlightsByUserService.js";

export async function listFlightsByUser(request: ZodRequest<{ params: typeof FlightUserParams }>, reply: FastifyReply) {
  const listFlightsByUserService = new ListFlightsByUserService();

  const flights = await listFlightsByUserService.execute({ userId: request.params.userId });

  return reply.send(flights);
}
