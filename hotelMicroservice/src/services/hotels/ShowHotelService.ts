import { status } from "@grpc/grpc-js";
import { Hotel } from "@prisma/client";
import HotelsRepository from "../../repositories/implementations/HotelsRepository";
import AppError from "../../../../common/errors/AppError";

type HotelRequest = {
  hotelId: string
}

type HotelResponse = {
  id: string;
  hotel: string;
  offers: string;
  createdAt: number;
  updatedAt: number;
}

export default class ShowHotelService {

  private hotelsRepository: HotelsRepository;

  constructor() {
    this.hotelsRepository = new HotelsRepository();
  }

  async execute({ hotelId }: HotelRequest): Promise<HotelResponse> {
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