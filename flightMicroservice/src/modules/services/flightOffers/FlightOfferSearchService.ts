import { FlightOfferSearchRequest } from "../../../@types/amadeus/flights/FlightOfferSearchRequest";
import { FlightOfferSearchResponse } from "../../../@types/amadeus/flights/FlightOfferSearchResponse";
import { TravelClass } from "../../../@types/amadeus/flights/TravelClass";
import { amadeus } from "../../../shared/providers/amadeus/amadeusApi";

type FlightSerachRequestDTO = {
  originLocationCode: string;
  destinationLocationCode: string;
  departureDate: string;
  returnDate?: string;
  adults: number;
  children?: number;
  infants?: number;
  travelClass: string;
}

type FlightSerachResponseDTO = {
  flightOffers: string;
}


export class FlightOfferSearchService {

  public async execute({
    adults,
    departureDate,
    destinationLocationCode,
    originLocationCode,
    travelClass,
    children,
    infants,
    returnDate
  }: FlightSerachRequestDTO): Promise<FlightSerachResponseDTO> {
    const findTravelClass = TravelClass["ECONOMY"]
    const flightOffersResponse = await amadeus.shopping.flightOffersSearch.get({
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
    } as FlightOfferSearchRequest) as FlightOfferSearchResponse

    return {
      flightOffers: JSON.stringify(flightOffersResponse.data)
    }

  }
}