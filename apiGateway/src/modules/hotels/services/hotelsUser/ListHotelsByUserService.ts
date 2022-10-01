import { HotelListResponse, HotelsByUserRequest } from "dreams-proto-sharing/src/contracts/hotel/hotel_pb";
import hotelClient from "../../providers/HotelService";

type HotelRequest = {
  userId: string;
}

type HotelResponse = {
  id: string;
  hotel: any;
  offers: any;
  updateAt: Date;
  createAt: Date;
}

class ListHotelsByUserService {

  async execute({ userId }: HotelRequest): Promise<HotelResponse[]> {

    const listHotelsByUserServiceRequest = (user: HotelRequest) => new Promise<HotelListResponse>((resolve, reject) => {
      hotelClient.listHotelByUser(
        new HotelsByUserRequest().setUserid(user.userId),
        (err, hotel) => {
          if (err) {
            reject(err)
          }
          resolve(hotel)
        }
      );
    });

    const hotelsResponse = await listHotelsByUserServiceRequest({ userId });

    const hotels = [] as HotelResponse[];

    hotelsResponse.getHotelList().map(hotel => {
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

export default ListHotelsByUserService;
