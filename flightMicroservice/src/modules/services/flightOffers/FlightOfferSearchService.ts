import { inject, injectable } from "tsyringe";
import type { IFlightProvider } from "../../../shared/providers/FlightProvider/interfaces/IFlightProvider.js";

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

@injectable()
export class FlightOfferSearchService {
  constructor(
    @inject('FlightProvider')
    private flightProvider: IFlightProvider,
  ) { }
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

    const flightOffersResponse = await this.flightProvider.findFlights({
      originLocationCode,
      destinationLocationCode,
      departureDate,
      returnDate,
      adults,
      children,
      infants,
      travelClass
    })

    return {
      flightOffers: JSON.stringify(flightOffersResponse.data)
    }

  }
}