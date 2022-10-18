import { prisma } from "../../../../prisma"
import { ICreateHotelDTO } from "../../dtos/ICreateHotelDTO"
import { Hotel } from "../../entities/HotelEntity"
import { IHotelsRepository } from "../interfaces/IHotelsRepository"


export class HotelsRepository implements IHotelsRepository {

  async create({ hotel, offers, userId, isPackage }: ICreateHotelDTO): Promise<Hotel> {
    const hotelCreated = await prisma.hotel.create({
      data: {
        userId,
        hotel, 
        offers,
        isPackage
      }
    })

    return hotelCreated
  }

  async findByHotelId(hotelId: string): Promise<Hotel | null> {
    const hotel = await prisma.hotel.findFirst({ where: { id: hotelId } });
    return hotel;
  }

  async findAllHotels(): Promise<Hotel[]> {
    const hotels = await prisma.hotel.findMany();

    return hotels;
  }

  async findHotelsByUserId(userId: string): Promise<Hotel[]> {
    const hotels = await prisma.hotel.findMany({ 
      where: { 
        userId,
        isPackage: false
      }  
    })
    return hotels;
  }
}