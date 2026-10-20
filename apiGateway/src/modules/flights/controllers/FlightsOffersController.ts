import { FastifyReply } from "fastify";
import { injectable } from "tsyringe";
import { ZodRequest } from "../../../shared/http/types";
import { FlightOffersQuery } from "../../../schemas/flights";
import FlightOfferSearchService from "../services/flightOffers/FlightOfferSearchService";

@injectable()
export default class FlightsOffersController {

  async index(request: ZodRequest<{ querystring: typeof FlightOffersQuery }>, reply: FastifyReply) {
    const flightOfferSearchService = new FlightOfferSearchService();

    const flightOffers = await flightOfferSearchService.execute(request.query)

    return reply.send(flightOffers)
  }
}
