import { FlightOfferSearchResponse } from "../../../../../@types/amadeus/flights/FlightOfferSearchResponse";
import { FlightOfferSearchDTO } from "../dtos/FlightOffersSearchDTO";

export interface IFlightProvider {
  findFlights(data: FlightOfferSearchDTO): Promise<FlightOfferSearchResponse>
}
