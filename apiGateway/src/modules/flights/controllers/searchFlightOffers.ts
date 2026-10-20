import { FastifyReply } from "fastify";
import { ZodRequest } from "../../../shared/http/types";
import { FlightOffersQuery } from "../../../schemas/flights";
import FlightOfferSearchService from "../services/flightOffers/FlightOfferSearchService";

export async function searchFlightOffers(request: ZodRequest<{ body: typeof FlightOffersQuery }>, reply: FastifyReply) {
  const flightOfferSearchService = new FlightOfferSearchService();

  const flightOffers = await flightOfferSearchService.execute(request.body);

  return reply.send(flightOffers);
}
