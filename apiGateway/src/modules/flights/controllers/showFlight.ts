import { type FastifyReply } from "fastify";
import { type ZodRequest } from "../../../shared/http/types.js";
import { FlightIdParams } from "../../../schemas/flights.js";
import ShowFlightService from "../services/flights/ShowFlightService.js";

export async function showFlight(request: ZodRequest<{ params: typeof FlightIdParams }>, reply: FastifyReply) {
  const showFlightService = new ShowFlightService();

  const flight = await showFlightService.execute({ flightId: request.params.flightId });

  return reply.send(flight);
}
