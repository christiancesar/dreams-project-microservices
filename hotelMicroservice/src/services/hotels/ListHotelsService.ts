import { Hotel } from "@prisma/client";
import HotelsRepository from "../../repositories/implementations/HotelsRepository";

type HotelResponse = {
  id: string;
  hotel: string;
  offers: string;
  createdAt: number;
  updatedAt: number;
}

export default class ListHotelsService {

  private hotelsRepository: HotelsRepository;

  constructor() {
    this.hotelsRepository = new HotelsRepository()
  }

  async execute(): Promise<HotelResponse[]> {
    const hotels = await this.hotelsRepository.findAllHotels()

    const hotelsFmt: HotelResponse[] = [];

    hotels.map((hotel) => {
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