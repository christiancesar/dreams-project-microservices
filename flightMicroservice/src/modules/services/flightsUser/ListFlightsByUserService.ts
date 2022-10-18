import { ListFlightsByUserRequestDTO } from "../../dtos/ListFlightByUserRequestDTO";
import { ListFlightsByUserResponseDTO } from "../../dtos/ListFlightsByUserResponseDTO";
import { FlightsRepository } from "../../repositories/implementations/FlightsRepository";

export class ListFlightsByUserService {
  private flightsRepository: FlightsRepository;

  constructor() {
    this.flightsRepository = new FlightsRepository()
  }

  async execute({ userId }: ListFlightsByUserRequestDTO): Promise<ListFlightsByUserResponseDTO[]> {
    const flights = await this.flightsRepository.findByUserId(userId);

    const flightFmt: ListFlightsByUserResponseDTO[] = [];

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