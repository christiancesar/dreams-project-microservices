import { ChannelCredentials } from '@grpc/grpc-js';
import { HotelsClient } from 'dreams-proto-sharing/src/contracts/hotel/hotel_grpc_pb.js';
import {
  HotelCreate, HotelCreateRequest, HotelOffersRequest, HotelOffersResponse, HotelOffersSearch, HotelResponse, HotelResponse as HotelShowResponse,
  HotelShowRequest
} from 'dreams-proto-sharing/src/contracts/hotel/hotel_pb.js';
import { CreateHotelRequestDTO } from '../dtos/CreateHotelRequestDTO.js';
import { CreateHotelResponseDTO } from '../dtos/CreateHotelResponseDTO.js';
import { HotelOffersSearchRequestDTO } from '../dtos/HotelOffersSearchRequestDTO.js';
import { HotelOffersSearchResponseDTO } from '../dtos/HotelOffersSearchResponseDTO.js';
import { ShowHotelRequestDTO } from '../dtos/ShowHotelRequestDTO.js';
import { ShowHotelResponseDTO } from '../dtos/ShowHotelResponseDTO.js';
import { IHotelProvider } from '../interface/IHotelProvider.js';

export class HotelDreamsProvider implements IHotelProvider {
  private hotelClient: HotelsClient;

  constructor() {
    this.hotelClient = new HotelsClient(process.env.HOTEL_SERVICE_ADDRESS ?? '0.0.0.0:50054', ChannelCredentials.createInsecure());
  }

  async createHotel(hotel: CreateHotelRequestDTO): Promise<CreateHotelResponseDTO> {
    const createHotelServiceRequest = (hotel: CreateHotelRequestDTO) => new Promise<HotelResponse>((resolve, reject) => {
      this.hotelClient.createHotel(
        new HotelCreateRequest().setHotelcreate(
          new HotelCreate()
            .setUserid(hotel.userId)
            .setHotel(hotel.hotel)
            .setOffers(hotel.offers)
            .setIspackage(true)
        ),
        (err, hotel) => {
          if (err) {
            reject(err)
          }
          resolve(hotel)
        }
      );
    });

    const createHotelResponse = await createHotelServiceRequest({
      hotel: hotel.hotel,
      offers: hotel.offers,
      userId: hotel.userId
    })

    return createHotelResponse.getHotel()!.toObject();

  }

  async showHotel(hotel: ShowHotelRequestDTO): Promise<ShowHotelResponseDTO> {
    const showHotelServiceRequest = (hotel: ShowHotelRequestDTO) => new Promise<HotelShowResponse>((resolve, reject) => {
      this.hotelClient.showHotel(
        new HotelShowRequest().setId(hotel.hotelId),
        (err, hotel) => {
          if (err) {
            reject(err)
          }
          resolve(hotel)
        }
      );
    });

    const showHotelResponse = await showHotelServiceRequest(hotel)

    return showHotelResponse.getHotel()!.toObject();
  }
  async hotelOffersSearch({ adults, checkInDate, checkOutDate, cityCode, roomQuantity }: HotelOffersSearchRequestDTO): Promise<HotelOffersSearchResponseDTO> {

    const hotelServiceRequest = ({ adults, checkInDate, checkOutDate, cityCode, roomQuantity }: HotelOffersSearchRequestDTO) => new Promise<HotelOffersResponse>((resolve, reject) => {
      this.hotelClient.searchHotelOffer(
        new HotelOffersRequest().setHotelofferssearch(
          new HotelOffersSearch()
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
      adults
    })

    return {
      hoteloffers: hotelOffersResponse.getHoteloffers()
    }

  }
}