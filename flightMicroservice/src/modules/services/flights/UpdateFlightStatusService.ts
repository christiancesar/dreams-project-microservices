import { inject, injectable } from "tsyringe";
import { IFlightsRepository } from "../../repositories/interfaces/IFlightsRepository";

enum Status {
  CREATED = 'created',
  UPDATED = 'updated',
  DELETED = 'deleted',
  ERROR = 'error',
  CANCELED = 'canceled',
}

type UpdateFlightStatusParams = {
  flightId: string;
  eventName: string;
  errorDescription: string;
};

@injectable()
export class UpdateFlightStatusService {
  constructor(
    @inject('FlightsRepository')
    private flightsRepository: IFlightsRepository,
  ) { }
  
  async execute({ flightId, eventName, errorDescription }: UpdateFlightStatusParams): Promise<void> {
    const flight = await this.flightsRepository.findByFlightId(flightId);

    if (!flight) {
      throw new Error('Hotel not found');
    }
     

    await this.flightsRepository.updateFlightStatus({
      active: false,
      errorDescription,
      eventName,
      flightId,
      status: Status.ERROR,
    });
  }
}