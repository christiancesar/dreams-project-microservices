import { FastifyReply } from "fastify";
import { injectable } from "tsyringe";
import { ZodRequest } from "../../../shared/http/types";
import { HotelOffersQuery } from "../../../schemas/hotels";
import HotelOfferSearchService from "../services/hotelOffers/HotelOffersSearchService";

@injectable()
export class HotelOffersController {
  async index(request: ZodRequest<{ querystring: typeof HotelOffersQuery }>, reply: FastifyReply) {
    const hotelOfferSearchService = new HotelOfferSearchService();

    const hotels = await hotelOfferSearchService.execute(request.query);

    return reply.send(hotels)
  }
}
