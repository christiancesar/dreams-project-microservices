import { FlightOfferSearchResponse } from "../../../../@types/amadeus/flights/FlightOfferSearchResponse.js";
import { FlightOfferSearchDTO } from "../dtos/FlightOffersSearchDTO.js";

export interface IFlightProvider {
  findFlights(data: FlightOfferSearchDTO): Promise<FlightOfferSearchResponse>
}
