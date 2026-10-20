import { inject, injectable } from "tsyringe";
import { ListHotelsResponseDTO } from "../../dtos/ListHotelsResponseDTO.js";
import { Hotel } from "../../entities/HotelEntity.js";
import type { IHotelsRepository } from "../../repositories/interfaces/IHotelsRepository.js";

@injectable()
export default class ListHotelsService {

  constructor(
    @inject('HotelsRepository')
    private hotelsRepository: IHotelsRepository,

  ) {  }

  async execute(): Promise<ListHotelsResponseDTO[]> {
    const hotels = await this.hotelsRepository.findAllHotels()

    const hotelsFmt: ListHotelsResponseDTO[] = [];

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