import { injectable } from "tsyringe";
import { FlightOfferSearchRequest } from "../../../../@types/amadeus/flights/FlightOfferSearchRequest.js";
import { FlightOfferSearchResponse } from "../../../../@types/amadeus/flights/FlightOfferSearchResponse.js";
import { TravelClass } from "../../../../@types/amadeus/flights/TravelClass.js";
import { FlightOfferSearchDTO } from "../dtos/FlightOffersSearchDTO.js";
import { IFlightProvider } from "../interfaces/IFlightProvider.js";

import { Amadeus } from "dreams-amadeus";

@injectable()
export class FlightAmadeusProvider implements IFlightProvider {
  private amadeus: any;
  constructor() {
      this.amadeus = new Amadeus({
        clientId: process.env.AMADEUS_CLIENT_ID,
        clientSecret: process.env.AMADEUS_CLIENT_SECRET,
      })
  }
  async findFlights({
    adults,
    departureDate,
    destinationLocationCode,
    originLocationCode,
    travelClass,
    children,
    infants,
    returnDate
  }: FlightOfferSearchDTO): Promise<FlightOfferSearchResponse> {
    const findTravelClass = TravelClass["ECONOMY"]

    const flightOffersResponse = await this.amadeus.shopping.flightOffersSearch.get({
      originLocationCode,
      destinationLocationCode,
      departureDate,
      returnDate,
      adults,
      children,
      infants,
      travelClass: findTravelClass,
      currencyCode: 'BRL',
      max: 10
    } as FlightOfferSearchRequest) as FlightOfferSearchResponse;

    return flightOffersResponse
  }


}
