import { FastifyReply } from "fastify";
import { HotelOffersQuery } from "../../../schemas/hotels";
import HotelOfferSearchService from "../services/hotelOffers/HotelOffersSearchService";

export class HotelOffersController {
  async index(query: HotelOffersQuery, reply: FastifyReply) {
    const hotelOfferSearchService = new HotelOfferSearchService();

    const hotels = await hotelOfferSearchService.execute(query);

    return reply.send(hotels)
  }
}
