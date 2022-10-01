import { HotelOffer, HotelOfferSearchResponse } from "../../../../@types/amadeus/hotels/HotelOfferSearchResponse";
import { HotelOffersRequest, HotelOffersResponse, HotelOffersSearch as HotelOffersSearchObject } from "dreams-proto-sharing/src/contracts/hotel/hotel_pb";
import hotelClient from "../../providers/HotelService";

type HotelOffersSearch = {
  cityCode: string;
  checkInDate: string;
  checkOutDate: string;
  roomQuantity: number;
  adults: number;
}

export default class HotelOfferSearchService {
  async execute({
    adults,
    checkInDate,
    checkOutDate,
    cityCode,
    roomQuantity
  }: HotelOffersSearch): Promise<HotelOffer[]> {

    const hotelServiceRequest = (search: HotelOffersSearch) => new Promise<HotelOffersResponse>((resolve, reject) => {
      hotelClient.searchHotelOffer(
        new HotelOffersRequest().setHotelofferssearch(
          new HotelOffersSearchObject()
            .setAdults(adults)
            .setCheckindate(checkInDate)
            .setCheckoutdate(checkOutDate)
            .setCitycode(cityCode)
            .setRoomquantity(roomQuantity)
        ), (err, hotel) => {
          if (err) {
            reject(err)
          }
          resolve(hotel)
        }
      );
    });

    const hotelOffersResponse = await hotelServiceRequest({
      cityCode,
      checkInDate,
      checkOutDate,
      roomQuantity,
      adults,
    })

    const hotels = JSON.parse(hotelOffersResponse.getHoteloffers()) as HotelOffer[];

    return hotels;

  }
}