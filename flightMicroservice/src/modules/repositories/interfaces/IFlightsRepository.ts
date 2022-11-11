import { CreateFlightRequestDTO } from "../../dtos/CreateFlightRequestDTO"
import { UpdateFlightStatusDTO } from "../../dtos/UpdateFlightStatusDTO"
import { Flight } from "../../entities/FlightEntity"

export interface IFlightsRepository {
  create(data: CreateFlightRequestDTO): Promise<Flight>
  findByFlightId(flightId: string): Promise<Flight  | null>
  findAll(): Promise<Flight[]>
  updateFlightStatus(data: UpdateFlightStatusDTO): Promise<void>;
  findByUserId(userId: string): Promise<Flight[]>
}
