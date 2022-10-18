import { inject, injectable } from "tsyringe";
import { HotelOffersSearchDTO } from "../../../shared/providers/HotelProvider/dtos/HotelOffersSearchDTO";
import { IHotelProvider } from "../../../shared/providers/HotelProvider/interfaces/IHotelProvider";

type HotelOffersSearchResponse = {
  hotelOffers: string
}

@injectable()
export default class HotelOffersSearchService {
  constructor(
    @inject('HotelProvider')
    private hotelProvider: IHotelProvider
  ) { }
  
  async execute({
    adults,
    checkInDate,
    checkOutDate,
    cityCode,
    roomQuantity
  }: HotelOffersSearchDTO): Promise<HotelOffersSearchResponse> {
    const hotelOffersSearch = await this.hotelProvider.findHotels(
      {
        adults,
        checkInDate,
        checkOutDate,
        cityCode,
        roomQuantity
      }
    );


    return {
      hotelOffers: JSON.stringify(hotelOffersSearch.data)
    }
  }
}