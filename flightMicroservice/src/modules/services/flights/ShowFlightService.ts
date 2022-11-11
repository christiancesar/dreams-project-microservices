import { status } from "@grpc/grpc-js";
import { inject, injectable } from "tsyringe";
import { AppError } from "../../../shared/errors/AppError";
import { ShowFlightRequestDTO } from "../../dtos/ShowFlightRequestDTO";
import { ShowFlighResponseDTO } from "../../dtos/ShowFlightResponseDTO";
import { IFlightsRepository } from "../../repositories/interfaces/IFlightsRepository";

@injectable()
export class ShowFlightService {
  constructor(
    @inject('FlightsRepository')
    private flightsRepository: IFlightsRepository,
  ) { }

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