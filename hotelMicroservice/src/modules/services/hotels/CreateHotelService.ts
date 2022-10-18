import { inject, injectable } from "tsyringe";
import { CreateHotelRequestDTO } from "../../dtos/CreateHotelRequestDTO";
import { CreateHotelResponseDTO } from "../../dtos/CreateHotelResponseDTO";
import { IHotelsRepository } from "../../repositories/interfaces/IHotelsRepository";

@injectable()
export default class CreateHotelService {

  constructor(
    @inject('HotelsRepository')
    private hotelsRepository: IHotelsRepository,

  ) { }

  async execute({ hotel, offers, userId, isPackage}: CreateHotelRequestDTO): Promise<CreateHotelResponseDTO> {
    const hotelCreated = await this.hotelsRepository.create({
      userId,
      hotel,
      offers,
      isPackage
    });

    return {
      id: hotelCreated.id,
      hotel: JSON.stringify(hotelCreated.hotel),
      offers: JSON.stringify(hotelCreated.offers),
      createdAt: Date.parse(hotelCreated.createdAt.toDateString()),
      updatedAt: Date.parse(hotelCreated.updatedAt.toDateString()),
    };
  }
} 