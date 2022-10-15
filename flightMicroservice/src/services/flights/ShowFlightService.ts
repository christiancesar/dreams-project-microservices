import { status } from "@grpc/grpc-js";
import AppError from "../../../common/errors/AppError";
import { FlightsRepository } from "../repositories/implementations/FlightsRepository";

type FlightRequest = {
  flightId: string
}

type FlightResponse = {
  id: string;
  itineraries: any;
  price: any;
  userId: string;
  isPackage: boolean;
  createdAt: number;
  updatedAt: number;
}

export default class ShowFlightService {
  private flightsRepository: FlightsRepository;

  constructor() {
    this.flightsRepository = new FlightsRepository()
  }

  async execute({ flightId }: FlightRequest): Promise<FlightResponse> {
    const flight = await this.flightsRepository.findByFlightId(flightId);

    if (!flight) {
      throw new AppError({ code: status.NOT_FOUND, name: 'Show User', message: 'Sorry, but flight not exist.' });
    }
    return {
      userId: flight.userId,
      id: flight.id,
      itineraries: JSON.stringify(flight.itineraries),
      price: JSON.stringify(flight.price),
      isPackage: flight.isPackage,
      createdAt: Date.parse(flight.createdAt.toDateString()),
      updatedAt: Date.parse(flight.updatedAt.toDateString()),
    };
  }
}