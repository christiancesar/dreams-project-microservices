import { FlightsRepository } from "../repositories/implementations/FlightsRepository";

type FlightRequest = {
  userId: string
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

export default class ListFlightsByUserService {
  private flightsRepository: FlightsRepository;

  constructor() {
    this.flightsRepository = new FlightsRepository()
  }

  async execute({ userId }: FlightRequest): Promise<FlightResponse[]> {
    const flights = await this.flightsRepository.findByUserId(userId);

    const flightFmt: FlightResponse[] = [];

    flights.map((flight) => {
      flightFmt.push({
        userId: flight.userId,
        id: flight.id,
        itineraries: JSON.stringify(flight.itineraries),
        price: JSON.stringify(flight.price),
        isPackage: flight.isPackage,
        createdAt: Date.parse(flight.createdAt.toDateString()),
        updatedAt: Date.parse(flight.updatedAt.toDateString()),
      })
    })

    return flightFmt
  }
}