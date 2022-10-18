import { status } from "@grpc/grpc-js";
import { AppError } from "../../../shared/errors/AppError";
import { ShowFlightRequestDTO } from "../../dtos/ShowFlightRequestDTO";
import { ShowFlighResponseDTO } from "../../dtos/ShowFlightResponseDTO";
import { FlightsRepository } from "../../repositories/implementations/FlightsRepository";

export class ShowFlightService {
  private flightsRepository: FlightsRepository;

  constructor() {
    this.flightsRepository = new FlightsRepository()
  }

  async execute({ flightId }: ShowFlightRequestDTO): Promise<ShowFlighResponseDTO> {
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