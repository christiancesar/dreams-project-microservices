import { FastifyReply } from "fastify";
import { ZodRequest } from "../../../shared/http/types";
import { FlightIdParams } from "../../../schemas/flights";
import ShowFlightService from "../services/flights/ShowFlightService";

export async function showFlight(request: ZodRequest<{ params: typeof FlightIdParams }>, reply: FastifyReply) {
  const showFlightService = new ShowFlightService();

  const flight = await showFlightService.execute({ flightId: request.params.flightId });

  return reply.send(flight);
}
