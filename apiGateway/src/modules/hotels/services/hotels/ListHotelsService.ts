import { Hotel } from "@prisma/client";
import { Empty } from "google-protobuf/google/protobuf/empty_pb";
import { HotelListResponse } from "dreams-proto-sharing/src/contracts/hotel/hotel_pb";
import hotelClient from "../../providers/HotelService";

type HotelResponse = {
  id: string;
  hotel: any;
  offers: any;
  updateAt: Date;
  createAt: Date;
}

export default class ListHotelsService {

  async execute(): Promise<HotelResponse[]> {

    const listHotelServiceRequest = () => new Promise<HotelListResponse>((resolve, reject) => {
      hotelClient.listHotels(
        new Empty(),
        (err, hotel) => {
          if (err) {
            reject(err)
          }
          resolve(hotel)
        }
      );
    });

    const listHotelsResponse = await listHotelServiceRequest();

    const hotelsResponse = listHotelsResponse.getHotelList();

    const hotels: HotelResponse[] = [];

    hotelsResponse.map(hotel => {
      hotels.push({
        id: hotel.getId(),
        hotel: JSON.parse(hotel.getHotel()),
        offers: JSON.parse(hotel.getOffers()),
        createAt: new Date(hotel.getUpdateat()),
        updateAt: new Date(hotel.getUpdateat())
      });
    })


    return hotels
  }
}