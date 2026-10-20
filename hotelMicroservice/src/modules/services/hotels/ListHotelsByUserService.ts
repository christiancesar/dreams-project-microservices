import { inject, injectable } from "tsyringe";
import { ListHotelsByUserRequestDTO } from "../../dtos/ListHotelsByUserRequestDTO.js";
import { ListHotelsByUserResponseDTO } from "../../dtos/ListHotelsByUserResponseDTO.js";
import { Hotel } from "../../entities/HotelEntity.js";
import type { IHotelsRepository } from "../../repositories/interfaces/IHotelsRepository.js";

@injectable()
export default class ListHotelsByUserService {

  constructor(
    @inject('HotelsRepository')
    private hotelsRepository: IHotelsRepository,

  ) {  }

  async execute({ userId }: ListHotelsByUserRequestDTO): Promise<ListHotelsByUserResponseDTO[]> {
    const hotels = await this.hotelsRepository.findHotelsByUserId(userId);

    const hotelsFmt: ListHotelsByUserResponseDTO[] = [];

    hotels.map((hotel: Hotel) => {
      hotelsFmt.push({
        id: hotel.id,
        hotel: JSON.stringify(hotel.hotel),
        offers: JSON.stringify(hotel.offers),
        createdAt: Date.parse(hotel.createdAt.toDateString()),
        updatedAt: Date.parse(hotel.updatedAt.toDateString()),
      })
    })

    return hotelsFmt
  }
}