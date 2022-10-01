import { HotelOfferSearchRequest } from "../../@types/amadeus/hotels/HotelOfferSearchRequest";
import { HotelOffer, HotelOfferSearchResponse } from "../../@types/amadeus/hotels/HotelOfferSearchResponse";
import { amadeus } from "../../providers/amadeus/amadeusApi";

type HotelOffersSearchRequest = {
  cityCode: string;
  checkInDate: string;
  checkOutDate: string;
  roomQuantity: number;
  adults: number;
}

type HotelOffersSearchResponse = {
  hotelOffers: string
}

export default class HotelOfferSearchService {
  async execute({
    adults,
    checkInDate,
    checkOutDate,
    cityCode,
    roomQuantity
  }: HotelOffersSearchRequest): Promise<HotelOffersSearchResponse> {
    const hotelOffersSearch = await amadeus.shopping.hotelOffers.get({
      cityCode,
      checkInDate,
      checkOutDate,
      roomQuantity,
      adults,
      radius: 50,
      radiusUnit: 'KM',
      paymentPolicy: 'NONE',
      includeClosed: false,
      bestRateOnly: true,
      view: 'FULL',
      sort: 'NONE',
      currency: 'BRL',
      // "page%5Blimit%5D": 1
    } as HotelOfferSearchRequest) as HotelOfferSearchResponse;

    return {
      hotelOffers: JSON.stringify(hotelOffersSearch.data)
    }
  }
}