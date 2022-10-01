import { FlightOfferSearchRequest } from "../../@types/amadeus/flights/FlightOfferSearchRequest";
import { FlightOfferSearchResponse } from "../../@types/amadeus/flights/FlightOfferSearchResponse";
import { TravelClass } from "../../@types/amadeus/flights/TravelClass";
import { amadeus } from "../../providers/amadeus/amadeusApi";

type FlightSerachRequest = {
  originLocationCode: string;
  destinationLocationCode: string;
  departureDate: string;
  returnDate?: string;
  adults: number;
  children?: number;
  infants?: number;
  travelClass: string;
}

type FlightSerachResponse = {
  flightOffers: string;
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
  }: FlightSerachRequest): Promise<FlightSerachResponse> {
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