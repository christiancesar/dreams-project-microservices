import { HotelResponse as HotelShowResponse, HotelShowRequest } from "dreams-proto-sharing/src/contracts/hotel/hotel_pb";
import hotelClient from "../../providers/HotelService";

type HotelRequest = {
  hotelId: string
}

type HotelResponse = {
  id: string;
  hotel: any;
  offers: any;
  updateAt: Date;
  createAt: Date;
}
export default class ShowHotelService {

  async execute({ hotelId }: HotelRequest): Promise<HotelResponse> {

    const showHotelServiceRequest = (hotel: HotelRequest) => new Promise<HotelShowResponse>((resolve, reject) => {
      hotelClient.showHotel(
        new HotelShowRequest().setId(hotel.hotelId),
        (err, hotel) => {
          if (err) {
            reject(err)
          }
          resolve(hotel)
        }
      );
    });

    const showHotelResponse = await showHotelServiceRequest({ hotelId });

    const hotelResponse = showHotelResponse.getHotel()!.toObject();

    return {
      id: hotelResponse.id,
      hotel: JSON.parse(hotelResponse.hotel),
      offers: JSON.parse(hotelResponse.offers),
      createAt: new Date(hotelResponse.createdat),
      updateAt: new Date(hotelResponse.updateat)
    };
  }
}