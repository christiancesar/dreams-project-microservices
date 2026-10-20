import { HotelOfferSearchResponse } from "../../../../@types/amadeus/hotels/HotelOfferSearchResponse.js";
import { HotelOffersSearchDTO } from "../dtos/HotelOffersSearchDTO.js";

export interface IHotelProvider {
  findHotels(data: HotelOffersSearchDTO): Promise<HotelOfferSearchResponse>
}
