import { type FastifyReply, type FastifyRequest } from "fastify";
import ListFlightsService from "../services/flights/ListFlightsService.js";

export async function listFlights(_request: FastifyRequest, reply: FastifyReply) {
  const listFlightsService = new ListFlightsService();

  const flights = await listFlightsService.execute();

  return reply.send(flights);
}
