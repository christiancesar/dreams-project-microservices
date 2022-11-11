import { inject, injectable } from "tsyringe";
import { ListFlightsResponseDTO } from "../../dtos/ListFlightsResponseDTO";
import { IFlightsRepository } from "../../repositories/interfaces/IFlightsRepository";

@injectable()
export class ListFlightsService {
  constructor(
    @inject('FlightsRepository')
    private flightsRepository: IFlightsRepository,
  ) { }

  async execute(): Promise<ListFlightsResponseDTO[]> {
    const flights = await this.flightsRepository.findAll();
    
    const flightFmt: ListFlightsResponseDTO[] = [];

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