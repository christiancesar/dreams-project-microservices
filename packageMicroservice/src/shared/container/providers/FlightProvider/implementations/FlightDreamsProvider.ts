import { ChannelCredentials } from '@grpc/grpc-js';
import { FlightsClient } from 'dreams-proto-sharing/src/contracts/flight/flight_grpc_pb';
import { FlightCreate, FlightCreateRequest, FlightOffersRequest, FlightOffersResponse, FlightOffersSearch, FlightResponse as FlightShowResponse, FlightShowRequest } from 'dreams-proto-sharing/src/contracts/flight/flight_pb';
import { CreateFlightRequestDTO } from '../dtos/CreateFlightRequestDTO';
import { CreateFlightResponseDTO } from '../dtos/CreateFlightResponseDTO';
import { FlightOffersSearchRequestDTO } from '../dtos/FlightOffersSearchRequestDTO';
import { FlightOffersSearchResponseDTO } from '../dtos/FlightOffersSearchResponseDTO';
import { ShowFlightRequestDTO } from '../dtos/ShowFlightRequestDTO';
import { ShowFlightResponseDTO } from '../dtos/ShowFlightResponseDTO';
import { IFlightProvider } from '../interfaces/IFlightProvider';

export class FlightDreamsProvider implements IFlightProvider {
  private flightClient: FlightsClient;

  constructor() {
    this.flightClient = new FlightsClient('0.0.0.0:50053', ChannelCredentials.createInsecure())
  }

  async createFlight(flight: CreateFlightRequestDTO): Promise<CreateFlightResponseDTO> {

    const createFlightServiceRequest = (flight: CreateFlightRequestDTO) => new Promise<FlightShowResponse>((resolve, reject) => {
      this.flightClient.createFlight(
        new FlightCreateRequest().setFlightcreate(
          new FlightCreate()
            .setItineraries(flight.itineraries)
            .setPrice(flight.price)
            .setUserid(flight.userId)
            .setIspackage(true)
        ),
        (err, flight) => {
          if (err) {
            reject(err)
          }
          resolve(flight)
        }
      );
    });

    const createFlightResponse = await createFlightServiceRequest({
      itineraries: flight.itineraries,
      price: flight.price,
      userId: flight.userId
    });

    return createFlightResponse.getFlight()!.toObject();
  }

  async showFlight(flight: ShowFlightRequestDTO): Promise<ShowFlightResponseDTO> {
    const showFlightServiceRequest = (flight: ShowFlightRequestDTO) => new Promise<FlightShowResponse>((resolve, reject) => {
      this.flightClient.showFlight(
        new FlightShowRequest().setId(flight.flightId),
        (err, flight) => {
          if (err) {
            reject(err)
          }
          resolve(flight)
        }
      );
    });

    const showFlightResponse = await showFlightServiceRequest(flight)
    
    return showFlightResponse.getFlight()!.toObject();
  }

  async flightOffersSearch(flight: FlightOffersSearchRequestDTO): Promise<FlightOffersSearchResponseDTO> {
    
    const flightServiceRequest = (flight: FlightOffersSearchRequestDTO) => new Promise<FlightOffersResponse>((resolve, reject) => {
      this.flightClient.searchFlightOffer(
        new FlightOffersRequest().setFlightofferssearch(
          new FlightOffersSearch()
            .setAdults(flight.adults)
            .setDeparturedate(flight.departureDate)
            .setDestinationlocationcode(flight.destinationLocationCode)
            .setOriginlocationcode(flight.originLocationCode)
            .setTravelclass(flight.travelClass)
            .setChildren(flight.children || 0)
            .setInfants(flight.infants || 0)
            .setReturndate(flight.returnDate || '')
        ), (err, flight) => {
          if (err) {
            reject(err)
          }
          resolve(flight)
        }
      );
    });

    const flightOffersResponse = await flightServiceRequest({
      adults: flight.adults,
      departureDate: flight.departureDate,
      destinationLocationCode: flight.destinationLocationCode,
      originLocationCode: flight.originLocationCode,
      travelClass: flight.travelClass,
      children: flight.children,
      infants: flight.infants,
      returnDate: flight.returnDate
    })

    return {
      flightoffers: flightOffersResponse.getFlightoffers()
    }
  }

  
}

