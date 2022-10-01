import { handleUnaryCall, ServerErrorResponse } from "@grpc/grpc-js";
import { IHotelsServer } from "dreams-proto-sharing/src/contracts/hotel/hotel_grpc_pb";
import {
  Hotel,
  HotelsByUserRequest,
  HotelListResponse,
  HotelOffersRequest,
  HotelOffersResponse,
  HotelCreateRequest,
  HotelResponse,
  HotelShowRequest
} from "dreams-proto-sharing/src/contracts/hotel/hotel_pb";
import { Empty } from "google-protobuf/google/protobuf/empty_pb";
import HotelOfferSearchService from "../../services/hotelOffers/HotelOffersSearchService";
import CreateHotelService from "../../services/hotels/CreateHotelService";
import ListHotelsByUserService from "../../services/hotels/ListHotelsByUserService";
import ListHotelsService from "../../services/hotels/ListHotelsService";
import ShowHotelService from "../../services/hotels/ShowHotelService";

class HotelServer implements IHotelsServer {
  listHotelByUser: handleUnaryCall<HotelsByUserRequest, HotelListResponse> = async (call, callback): Promise<void> => {
    try {
      const userId = call.request.getUserid();
      const hotelListResponse = new HotelListResponse();
      const listHotelsByUserService = new ListHotelsByUserService();

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
      const createHotelService = new CreateHotelService();

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
      const listHotelsService = new ListHotelsService();

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
      const showHotelService = new ShowHotelService();
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
      const hotelOfferSearchService = new HotelOfferSearchService();

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
