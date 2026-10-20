import { injectable } from "tsyringe";
import { HotelOfferSearchRequest } from "../../../../@types/amadeus/hotels/HotelOfferSearchRequest.js";
import { HotelOfferSearchResponse } from "../../../../@types/amadeus/hotels/HotelOfferSearchResponse.js";
import { HotelOffersSearchDTO } from "../dtos/HotelOffersSearchDTO.js";
import { IHotelProvider } from "../interfaces/IHotelProvider.js";

import { Amadeus } from "dreams-amadeus";

@injectable()
export class HotelAmadeusProvider implements IHotelProvider {
  private amadeus: any;
  constructor() {
      this.amadeus = new Amadeus({
        clientId: process.env.AMADEUS_CLIENT_ID,
        clientSecret: process.env.AMADEUS_CLIENT_SECRET,
      })
  }
  async findHotels({
    adults,
    checkInDate,
    checkOutDate,
    cityCode,
    roomQuantity
  }: HotelOffersSearchDTO): Promise<HotelOfferSearchResponse> {
    const hotelOffersSearch = await this.amadeus.shopping.hotelOffers.get({
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

    return hotelOffersSearch
  }


}
