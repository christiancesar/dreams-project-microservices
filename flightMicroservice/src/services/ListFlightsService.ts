import { FlightsRepository } from "../repositories/implementations/FlightsRepository";

type FlightResponse = {
  id: string;
  itineraries: any;
  price: any;
  userId: string;
  isPackage: boolean;
  createdAt: number;
  updatedAt: number;
}

export default class ListFlightsService {
  private flightsRepository: FlightsRepository;

  constructor() {
    this.flightsRepository = new FlightsRepository()
  }

  async execute(): Promise<FlightResponse[]> {
    const flights = await this.flightsRepository.findAll();
    
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