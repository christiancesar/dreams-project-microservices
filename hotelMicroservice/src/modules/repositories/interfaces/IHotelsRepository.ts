import { CreateHotelRequestDTO } from "../../dtos/CreateHotelRequestDTO"
import { UpdateHotelStatusDTO } from "../../dtos/UpdateHotelStatusDTO";
import { Hotel } from "../../entities/HotelEntity"

export interface IHotelsRepository {
  create(data: CreateHotelRequestDTO): Promise<Hotel>;
  findByHotelId(hotelId: string): Promise<Hotel | null>;
  findAllHotels(): Promise<Hotel[]>;
  updateHotelStatus(data: UpdateHotelStatusDTO): Promise<void>;
  findHotelsByUserId(userId: string): Promise<Hotel[]>;
}