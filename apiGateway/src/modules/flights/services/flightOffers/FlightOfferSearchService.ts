import flightClient from "../../providers/FlightService";
import { FlightOffer } from "../../../../@types/amadeus/flights/FlightOfferSearchResponse";
import { 
  FlightOffersRequest, 
  FlightOffersResponse, 
  FlightOffersSearch 
} from "dreams-proto-sharing/src/contracts/flight/flight_pb";

type FlightRequest = {
  originLocationCode: string;
  destinationLocationCode: string;
  departureDate: string;
  returnDate?: string;
  adults: number;
  children?: number;
  infants?: number;
  travelClass: string;
}

export default class FlightOfferSearchService {

  public async execute({
    adults,
    departureDate,
    destinationLocationCode,
    originLocationCode,
    travelClass,
    children,
    infants,
    returnDate
  }: FlightRequest): Promise<FlightOffer[]> {
    
    const flightServiceRequest = (search: FlightRequest) => new Promise<FlightOffersResponse>((resolve, reject) => {
      flightClient.searchFlightOffer(
        new FlightOffersRequest().setFlightofferssearch(
          new FlightOffersSearch()
            .setAdults(adults)
            .setDeparturedate(departureDate)
            .setDestinationlocationcode(destinationLocationCode)
            .setOriginlocationcode(originLocationCode)
            .setTravelclass(travelClass)
            .setChildren(children || 0)
            .setInfants(infants || 0)
            .setReturndate(returnDate || '')
        ), (err, flight) => {
          if (err) {
            reject(err)
          }
          resolve(flight)
        }
      );
    });

    const flightOffersResponse = await flightServiceRequest({
      adults,
      departureDate,
      destinationLocationCode,
      originLocationCode,
      travelClass,
      children,
      infants,
      returnDate
    })

    const flights = JSON.parse(flightOffersResponse.getFlightoffers()) as FlightOffer[]

    return flights;
  }
}