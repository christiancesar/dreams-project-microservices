import { type FastifyReply } from "fastify";
import { type ZodRequest } from "../../../shared/http/types.js";
import { FlightOffersQuery } from "../../../schemas/flights.js";
import FlightOfferSearchService from "../services/flightOffers/FlightOfferSearchService.js";

export async function searchFlightOffers(request: ZodRequest<{ body: typeof FlightOffersQuery }>, reply: FastifyReply) {
  const flightOfferSearchService = new FlightOfferSearchService();

  const flightOffers = await flightOfferSearchService.execute(request.body);

  return reply.send(flightOffers);
}
