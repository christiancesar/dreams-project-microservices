import { ICreateFlightDTO } from "../../dtos/ICreateFlightDTO"

export interface IFlightsRepository {
  create(data: ICreateFlightDTO): Promise<Flight>
  findByFlightId(flightId: string): Promise<Flight  | null>
  findAll(): Promise<Flight[]>

  findByUserId(userId: string): Promise<Flight[]>
}
