import { HotelCreate, HotelCreateRequest, HotelResponse as HotelCreateResponse} from "dreams-proto-sharing/src/contracts/hotel/hotel_pb";
import hotelClient from "../../providers/HotelService";

type HotelRequest = {
  userId: string;
  hotel: any;
  offers: any;
}

type HotelResponse = {
  id: string;
  hotel: any;
  offers: any;
  updateAt: Date;
  createAt: Date;
}


export default class CreateHotelService {


  async execute({ hotel, offers, userId }: HotelRequest): Promise<HotelResponse> {

    const createHotelServiceRequest = (search: HotelRequest) => new Promise<HotelCreateResponse>((resolve, reject) => {
      hotelClient.createHotel(
        new HotelCreateRequest().setHotelcreate(
          new HotelCreate()
            .setUserid(search.userId)
            .setHotel(JSON.stringify(search.hotel))
            .setOffers(JSON.stringify(search.offers))
        ),
        (err, hotel) => {
          if (err) {
            reject(err)
          }
          resolve(hotel)
        }
      );
    });

    const createHotelResponse = await createHotelServiceRequest({ hotel, offers, userId })
    const hotelResponse = createHotelResponse.getHotel()!.toObject()
    return {
      id: hotelResponse.id,
      hotel: JSON.parse(hotelResponse.hotel),
      offers: JSON.parse(hotelResponse.offers),
      createAt: new Date(hotelResponse.createdat),
      updateAt: new Date(hotelResponse.updateat)
    }
  }
} 