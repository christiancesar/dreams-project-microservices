import HotelsRepository from "../../repositories/implementations/HotelsRepository";

type HotelRequest = {
  userId: string;
  hotel: string;
  offers: string;
  isPackage: boolean;
}

type HotelResponse = {
  id: string;
  hotel: string;
  offers: string;
  createdAt: number;
  updatedAt: number;
}

export default class CreateHotelService {

  private hotelsRepository: HotelsRepository;

  constructor() {
    this.hotelsRepository = new HotelsRepository()
  }

  async execute({ hotel, offers, userId, isPackage}: HotelRequest): Promise<HotelResponse> {
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