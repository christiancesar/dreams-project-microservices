import { prisma } from "../../../../prisma"
import { CreateHotelRequestDTO } from "../../dtos/CreateHotelRequestDTO"
import { UpdateHotelStatusDTO } from "../../dtos/UpdateHotelStatusDTO"
import { Hotel } from "../../entities/HotelEntity"
import { IHotelsRepository } from "../interfaces/IHotelsRepository"


export class HotelsRepository implements IHotelsRepository {

  async create({ hotel, offers, userId, isPackage }: CreateHotelRequestDTO): Promise<Hotel> {
    const hotelCreated = await prisma.hotel.create({
      data: {
        userId,
        hotel,
        offers,
        isPackage,
        status: 'created',
        active: true,
        events: {
          create: { 
            eventName: 'HOTEL_CREATED', 
          } 
        }
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

  async updateHotelStatus({ hotelId, active, eventName, status, errorDescription }: UpdateHotelStatusDTO): Promise<void> {
    await prisma.hotel.update({
      where: { id: hotelId },
      data: {
        active,
        status,
        events: {
          create: {
            eventName,
            errorDescription
          }
        }
      }
    })

  }
}