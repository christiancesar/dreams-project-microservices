import { CreateFlightRequestDTO } from "../../dtos/CreateFlightRequestDTO.js"
import { UpdateFlightStatusDTO } from "../../dtos/UpdateFlightStatusDTO.js"
import { Flight } from "../../entities/FlightEntity.js"

export interface IFlightsRepository {
  create(data: CreateFlightRequestDTO): Promise<Flight>
  findByFlightId(flightId: string): Promise<Flight  | null>
  findAll(): Promise<Flight[]>
  updateFlightStatus(data: UpdateFlightStatusDTO): Promise<void>;
  findByUserId(userId: string): Promise<Flight[]>
}
