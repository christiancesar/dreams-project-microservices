import { ICreateHotelDTO } from "../../dtos/ICreateHotelDTO"
import { Hotel } from "../../entities/HotelEntity"

export interface IHotelsRepository {
  create(data: ICreateHotelDTO): Promise<Hotel>
  findByHotelId(hotelId: string): Promise<Hotel | null>
  findAllHotels(): Promise<Hotel[]>

  findHotelsByUserId(userId: string): Promise<Hotel[]>
}