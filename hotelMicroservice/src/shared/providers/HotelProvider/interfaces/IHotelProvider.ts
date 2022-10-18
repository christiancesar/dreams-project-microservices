import { HotelOfferSearchResponse } from "../../../../../@types/amadeus/hotels/HotelOfferSearchResponse";
import { HotelOffersSearchDTO } from "../dtos/HotelOffersSearchDTO";

export interface IHotelProvider {
  findHotels(data: HotelOffersSearchDTO): Promise<HotelOfferSearchResponse>
}
