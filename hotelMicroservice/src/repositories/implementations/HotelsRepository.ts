import { Hotel, Prisma } from "@prisma/client"
import { prisma } from "../../../prisma"
import { ICreateHotelDTO } from "../../dtos/ICreateHotelDTO"

interface IHotelsRepository {
  create(data: ICreateHotelDTO): Promise<Hotel>
  findByHotelId(hotelId: string): Promise<Hotel | null>
  findAllHotels(): Promise<Hotel[]>

  findHotelsByUserId(userId: string): Promise<Hotel[]>
}
export default class HotelsRepository implements IHotelsRepository {

  async create({ hotel, offers, userId, isPackage }: ICreateHotelDTO): Promise<Hotel> {
    const hotelCreated = await prisma.hotel.create({
      data: {
        userId,
        hotel: JSON.parse(hotel) as Prisma.JsonObject,
        offers: JSON.parse(offers) as Prisma.JsonArray,
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