import { FastifyReply } from "fastify";
import { ZodRequest } from "../../../shared/http/types";
import { HotelOffersQuery } from "../../../schemas/hotels";
import HotelOfferSearchService from "../services/hotelOffers/HotelOffersSearchService";

export async function searchHotelOffers(request: ZodRequest<{ body: typeof HotelOffersQuery }>, reply: FastifyReply) {
  const hotelOfferSearchService = new HotelOfferSearchService();

  const hotelOffers = await hotelOfferSearchService.execute(request.body);

  return reply.send(hotelOffers);
}
