import { inject, injectable } from "tsyringe";
import { IHotelsRepository } from "../../repositories/interfaces/IHotelsRepository";

enum Status {
  CREATED = 'created',
  UPDATED = 'updated',
  DELETED = 'deleted',
  ERROR = 'error',
  CANCELED = 'canceled',
}

type UpdateHotelStatusParams = {
  hotelId: string;
  eventName: string;
  errorDescription: string;
};

@injectable()
export class UpdateHotelStatusService {
  constructor(
    @inject('HotelsRepository')
    private hotelsRepository: IHotelsRepository,
  ) { }
  async execute({ hotelId, eventName, errorDescription }: UpdateHotelStatusParams): Promise<void> {
    const hotel = await this.hotelsRepository.findByHotelId(hotelId);

    if (!hotel) {
      throw new Error('Hotel not found');
    }
     

    await this.hotelsRepository.updateHotelStatus({
      active: false,
      errorDescription,
      eventName,
      hotelId,
      status: Status.ERROR,
    });
  }
}