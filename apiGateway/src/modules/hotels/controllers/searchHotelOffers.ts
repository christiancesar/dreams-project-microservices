import { type FastifyReply } from "fastify";
import { type ZodRequest } from "../../../shared/http/types.js";
import { HotelOffersQuery } from "../../../schemas/hotels.js";
import HotelOfferSearchService from "../services/hotelOffers/HotelOffersSearchService.js";

export async function searchHotelOffers(request: ZodRequest<{ body: typeof HotelOffersQuery }>, reply: FastifyReply) {
  const hotelOfferSearchService = new HotelOfferSearchService();

  const hotelOffers = await hotelOfferSearchService.execute(request.body);

  return reply.send(hotelOffers);
}
