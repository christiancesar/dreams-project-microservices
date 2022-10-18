import { inject, injectable } from "tsyringe";
import { ListHotelsByUserRequestDTO } from "../../dtos/ListHotelsByUserRequestDTO";
import { ListHotelsByUserResponseDTO } from "../../dtos/ListHotelsByUserResponseDTO";
import { Hotel } from "../../entities/HotelEntity";
import { IHotelsRepository } from "../../repositories/interfaces/IHotelsRepository";

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