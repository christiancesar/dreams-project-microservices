import { CreateHotelRequestDTO } from "../../dtos/CreateHotelRequestDTO.js"
import { UpdateHotelStatusDTO } from "../../dtos/UpdateHotelStatusDTO.js";
import { Hotel } from "../../entities/HotelEntity.js"

export interface IHotelsRepository {
  create(data: CreateHotelRequestDTO): Promise<Hotel>;
  findByHotelId(hotelId: string): Promise<Hotel | null>;
  findAllHotels(): Promise<Hotel[]>;
  updateHotelStatus(data: UpdateHotelStatusDTO): Promise<void>;
  findHotelsByUserId(userId: string): Promise<Hotel[]>;
}