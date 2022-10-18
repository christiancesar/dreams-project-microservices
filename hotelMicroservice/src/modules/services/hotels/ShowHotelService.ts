import { status } from "@grpc/grpc-js";
import { inject, injectable } from "tsyringe";
import { AppError } from "../../../shared/errors/AppError";
import { ShowHotelRequestDTO } from "../../dtos/ShowHotelRequestDTO";
import { ShowHotelResponseDTO } from "../../dtos/ShowHotelResponseDTO";
import { IHotelsRepository } from "../../repositories/interfaces/IHotelsRepository";

@injectable()
export default class ShowHotelService {

  constructor(
    @inject('HotelsRepository')
    private hotelsRepository: IHotelsRepository
  ) {  }

  async execute({ hotelId }: ShowHotelRequestDTO): Promise<ShowHotelResponseDTO> {
    const hotel = await this.hotelsRepository.findByHotelId(hotelId);
    
    if (!hotel) {
      throw new AppError({ code: status.NOT_FOUND, name: 'Show User', message: 'Sorry, but flight not exist.' });
    }

    return {
      id: hotel.id,
      hotel: JSON.stringify(hotel.hotel),
      offers: JSON.stringify(hotel.offers),
      createdAt: Date.parse(hotel.createdAt.toDateString()),
      updatedAt: Date.parse(hotel.updatedAt.toDateString()),
    }
  }
}