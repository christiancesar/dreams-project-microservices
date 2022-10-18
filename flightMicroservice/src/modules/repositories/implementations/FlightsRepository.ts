import { Flight, Prisma } from "@prisma/client"
import { prisma } from "../../../../prisma"
import { CreateFlightRequestDTO } from "../../dtos/CreateFlightRequestDTO"
import { IFlightsRepository } from "../interfaces/IFlightsRepository"

export class FlightsRepository implements IFlightsRepository {
  async create({ userId, itineraries, price, isPackage }: CreateFlightRequestDTO): Promise<Flight> {
    const flight = await prisma.flight.create({
      data: {
        userId,
        itineraries: JSON.parse(itineraries) as Prisma.JsonArray,
        price: JSON.parse(price) as Prisma.JsonObject,
        isPackage
      }
    })
    return flight
  }

  async findByFlightId(flightId: string): Promise<Flight | null> {
    const flight = await prisma.flight.findFirst({ where: { id: flightId } })
    return flight
  }

  async findAll(): Promise<Flight[]> {
    const flight = await prisma.flight.findMany()
    return flight
  }

  async findByUserId(userId: string): Promise<Flight[]> {
    const flights = await prisma.flight.findMany({ 
      where: { 
        userId,
        isPackage: false
      } 
    })

    return flights
  }

}