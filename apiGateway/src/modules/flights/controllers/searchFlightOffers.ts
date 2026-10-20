import { FastifyReply } from "fastify";
import { ZodRequest } from "../../../shared/http/types";
import { FlightOffersQuery } from "../../../schemas/flights";
import FlightOfferSearchService from "../services/flightOffers/FlightOfferSearchService";

export async function searchFlightOffers(request: ZodRequest<{ querystring: typeof FlightOffersQuery }>, reply: FastifyReply) {
  const flightOfferSearchService = new FlightOfferSearchService();

  const flightOffers = await flightOfferSearchService.execute(request.query);

  return reply.send(flightOffers);
}
