import { CreateFlightRequestDTO } from "../../dtos/CreateFlightRequestDTO";
import { CreateFlightResponseDTO } from "../../dtos/CreateFlightResponseDTO";
import { FlightsRepository } from "../../repositories/implementations/FlightsRepository";

export class CreateFlightService {
  private flightsRepository: FlightsRepository;

  constructor() {
    this.flightsRepository = new FlightsRepository()
  }

  async execute({ itineraries, price, userId, isPackage }: CreateFlightRequestDTO): Promise<CreateFlightResponseDTO> {
    const flight = await this.flightsRepository.create({
      itineraries,
      price,
      userId,
      isPackage
    });

    return {
      id: flight.id,
      itineraries: JSON.stringify(flight.itineraries),
      price: JSON.stringify(flight.price),
      createdAt: Date.parse(flight.createdAt.toDateString()),
      updatedAt: Date.parse(flight.updatedAt.toDateString()),
    }
  }
}