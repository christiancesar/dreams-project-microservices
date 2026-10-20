import { injectable } from "tsyringe";
import { FastifyReply } from "fastify";
import { FlightOffersQuery } from "../../../schemas/flights";
import FlightOfferSearchService from "../services/flightOffers/FlightOfferSearchService";

@injectable()
export default class FlightsOffersController {

  async index(query: FlightOffersQuery, reply: FastifyReply) {
    const flightOfferSearchService = new FlightOfferSearchService();

    const flightOffers = await flightOfferSearchService.execute(query)

    return reply.send(flightOffers)
  }
}
