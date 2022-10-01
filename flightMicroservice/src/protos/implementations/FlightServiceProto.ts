import { handleUnaryCall, ServerErrorResponse } from "@grpc/grpc-js";
import { IFlightsServer } from "dreams-proto-sharing/src/contracts/flight/flight_grpc_pb";
import {
  Flight,
  FlightListResponse,
  FlightOffersRequest,
  FlightOffersResponse,
  FlightCreateRequest,
  FlightResponse,
  FlightShowRequest,
  FlightByUserRequest
} from "dreams-proto-sharing/src/contracts/flight/flight_pb";
import { Empty } from "google-protobuf/google/protobuf/empty_pb";
import CreateFlightService from "../../services/CreateFlightService";
import FlightOfferSearchService from '../../services/flightOffers/FlightOfferSearchService';
import ListFlightsByUserService from "../../services/ListFlightsByUserService";
import ListFlightsService from "../../services/ListFlightsService";
import ShowFlightService from "../../services/ShowFlightService";

class FlightServer implements IFlightsServer {
  listFlightbyUser: handleUnaryCall<FlightByUserRequest, FlightListResponse> = async (call, callback): Promise<void> => {
    try {
      const userId = call.request.getUserid();

      const flightListResponse = new FlightListResponse();
      const listFlightsByUserService = new ListFlightsByUserService();

      const flights = await listFlightsByUserService.execute({ userId });

      if (flights) {
        flights.map((flight) => {
          flightListResponse.addFlight(
            new Flight().setId(flight.id)
              .setItineraries(flight.itineraries)
              .setPrice(flight.price)
              .setCreatedat(flight.createdAt)
              .setUpdateat(flight.updatedAt)
          );
        })
      }

      callback(null, flightListResponse);
    } catch (error) {
      callback(error as ServerErrorResponse, null);
    }

  }

  createFlight: handleUnaryCall<FlightCreateRequest, FlightResponse> = async (call, callback): Promise<void> => {
    try {
      const flightRequest = call.request.getFlightcreate()!.toObject();
      const flightResponse = new FlightResponse();
      const createFlightService = new CreateFlightService();

      const flight = await createFlightService.execute({
        itineraries: flightRequest.itineraries,
        price: flightRequest.price,
        userId: flightRequest.userid,
        isPackage: flightRequest.ispackage        
      })

      flightResponse.setFlight(
        new Flight()
          .setId(flight.id)
          .setItineraries(flight.itineraries)
          .setPrice(flight.price)
      )

      callback(null, flightResponse);
    } catch (error) {
      callback(error as ServerErrorResponse, null);
    }

  }

  listFlights: handleUnaryCall<Empty, FlightListResponse> = async (call, callback): Promise<void> => {
    try {
      const flightListResponse = new FlightListResponse();
      const listFlightsService = new ListFlightsService();

      const flights = await listFlightsService.execute();

      flights.map((flight) => {
        flightListResponse.addFlight(
          new Flight().setId(flight.id)
            .setItineraries(flight.itineraries)
            .setPrice(flight.price)
            .setCreatedat(flight.createdAt)
            .setUpdateat(flight.updatedAt)
        );
      })

      callback(null, flightListResponse);
    } catch (error) {
      callback(error as ServerErrorResponse, null);
    }

  }

  showFlight: handleUnaryCall<FlightShowRequest, FlightResponse> = async (call, callback): Promise<void> => {
    try {
      const flightShowRequest = call.request;
      const flightResponse = new FlightResponse();
      const showFlightService = new ShowFlightService();

      const flight = await showFlightService.execute({ flightId: flightShowRequest.getId() });

      flightResponse.setFlight(
        new Flight().setId(flight.id)
          .setItineraries(flight.itineraries)
          .setPrice(flight.price)
          .setCreatedat(flight.createdAt)
          .setUpdateat(flight.updatedAt)
      )

      callback(null, flightResponse);
    } catch (error) {
      callback(error as ServerErrorResponse, null);
    }
  }

  searchFlightOffer: handleUnaryCall<FlightOffersRequest, FlightOffersResponse> = async (call, callback): Promise<void> => {
    try {
      const flightOffersRequest = call.request.getFlightofferssearch()?.toObject()!
      const flightOffersResponse = new FlightOffersResponse();
      const flightOfferSearchService = new FlightOfferSearchService();

      const { flightOffers } = await flightOfferSearchService.execute({
        adults: flightOffersRequest.adults,
        departureDate: flightOffersRequest.departuredate,
        destinationLocationCode: flightOffersRequest.destinationlocationcode,
        originLocationCode: flightOffersRequest.originlocationcode,
        travelClass: flightOffersRequest.travelclass,
        children: flightOffersRequest.children,
        infants: flightOffersRequest.infants,
        returnDate: flightOffersRequest.returndate
      })

      flightOffersResponse.setFlightoffers(flightOffers)

      callback(null, flightOffersResponse);
    } catch (error) {
      callback(error as ServerErrorResponse, null);
    }

  }

  [name: string]: import("@grpc/grpc-js").UntypedHandleCall;
}

export default FlightServer;