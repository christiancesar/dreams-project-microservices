import { handleUnaryCall, ServerErrorResponse } from "@grpc/grpc-js";
import { IHotelsServer } from "dreams-proto-sharing/src/contracts/hotel/hotel_grpc_pb";
import {
  Hotel, 
  HotelCreateRequest, 
  HotelListResponse,
  HotelOffersRequest,
  HotelOffersResponse, 
  HotelResponse, 
  HotelsByUserRequest, 
  HotelShowRequest
} from "dreams-proto-sharing/src/contracts/hotel/hotel_pb";
import { Empty } from "google-protobuf/google/protobuf/empty_pb";
import { container } from "tsyringe";
import HotelOffersSearchService from "../../services/hotelOffers/HotelOffersSearchService";
import CreateHotelService from "../../services/hotels/CreateHotelService";
import ListHotelsByUserService from "../../services/hotels/ListHotelsByUserService";
import ListHotelsService from "../../services/hotels/ListHotelsService";
import ShowHotelService from "../../services/hotels/ShowHotelService";

class HotelServer implements IHotelsServer {
  listHotelByUser: handleUnaryCall<HotelsByUserRequest, HotelListResponse> = async (call, callback): Promise<void> => {
    try {
      const userId = call.request.getUserid();
      const hotelListResponse = new HotelListResponse();
      const listHotelsByUserService = container.resolve(ListHotelsByUserService );

      const hotels = await listHotelsByUserService.execute({ userId });

      hotels.map((hotel) => {
        hotelListResponse.addHotel(
          new Hotel().setId(hotel.id)
            .setHotel(hotel.hotel)
            .setOffers(hotel.offers)
        );
      })

      callback(null, hotelListResponse);
    } catch (error) {
      callback(error as ServerErrorResponse, null);
    }
  }

  createHotel: handleUnaryCall<HotelCreateRequest, HotelResponse> = async (call, callback): Promise<void> => {
    try {
      const hotelRequest = call.request.getHotelcreate()!.toObject();
      const hotelResponse = new HotelResponse();
      const createHotelService = container.resolve(CreateHotelService);

      const hotel = await createHotelService.execute({
        hotel: hotelRequest.hotel,
        offers: hotelRequest.offers,
        userId: hotelRequest.userid,
        isPackage: hotelRequest.ispackage
      })

      hotelResponse.setHotel(
        new Hotel()
          .setId(hotel.id)
          .setHotel(hotel.hotel)
          .setOffers(hotel.offers)
      )

      callback(null, hotelResponse);
    } catch (error) {
      callback(error as ServerErrorResponse, null);
    }

  }

  listHotels: handleUnaryCall<Empty, HotelListResponse> = async (call, callback): Promise<void> => {
    try {
      const hotelListResponse = new HotelListResponse();
      const listHotelsService = container.resolve(ListHotelsService);

      const hotels = await listHotelsService.execute();

      hotels.map((hotel) => {
        hotelListResponse.addHotel(
          new Hotel().setId(hotel.id)
            .setHotel(hotel.hotel)
            .setOffers(hotel.offers)
        );
      })

      callback(null, hotelListResponse);
    } catch (error) {
      callback(error as ServerErrorResponse, null);
    }

  }

  showHotel: handleUnaryCall<HotelShowRequest, HotelResponse> = async (call, callback): Promise<void> => {
    try {
      const hotelShowRequest = call.request;
      const hotelResponse = new HotelResponse();
      const showHotelService = container.resolve(ShowHotelService);
      const hotel = await showHotelService.execute({ hotelId: hotelShowRequest.getId() });

      hotelResponse.setHotel(
        new Hotel().setId(hotel.id)
          .setHotel(hotel.hotel)
          .setOffers(hotel.offers)
      )

      callback(null, hotelResponse);
    } catch (error) {
      callback(error as ServerErrorResponse, null);
    }
  }

  searchHotelOffer: handleUnaryCall<HotelOffersRequest, HotelOffersResponse> = async (call, callback): Promise<void> => {
    try {
      const hotelOffersRequest = call.request.getHotelofferssearch()?.toObject()!
      const hotelOffersResponse = new HotelOffersResponse();
      
      const hotelOfferSearchService = container.resolve(HotelOffersSearchService);

      const { hotelOffers } = await hotelOfferSearchService.execute({
        adults: hotelOffersRequest.adults,
        checkInDate: hotelOffersRequest.checkindate,
        checkOutDate: hotelOffersRequest.checkoutdate,
        cityCode: hotelOffersRequest.citycode,
        roomQuantity: hotelOffersRequest.roomquantity,
      })

      hotelOffersResponse.setHoteloffers(hotelOffers)

      callback(null, hotelOffersResponse);
    } catch (error) {
      callback(error as ServerErrorResponse, null);
    }

  }

  [name: string]: import("@grpc/grpc-js").UntypedHandleCall;
}

export default HotelServer;
