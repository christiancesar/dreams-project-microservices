import { CreateHotelRequestDTO } from "../dtos/CreateHotelRequestDTO";
import { CreateHotelResponseDTO } from "../dtos/CreateHotelResponseDTO";
import { HotelOffersSearchRequestDTO } from "../dtos/HotelOffersSearchRequestDTO";
import { HotelOffersSearchResponseDTO } from "../dtos/HotelOffersSearchResponseDTO";
import { ShowHotelRequestDTO } from "../dtos/ShowHotelRequestDTO";
import { ShowHotelResponseDTO } from "../dtos/ShowHotelResponseDTO";

export interface IHotelProvider {
  createHotel(hotel: CreateHotelRequestDTO): Promise<CreateHotelResponseDTO>;
  showHotel(hotel: ShowHotelRequestDTO): Promise<ShowHotelResponseDTO>;
  hotelOffersSearch(flight: HotelOffersSearchRequestDTO): Promise<HotelOffersSearchResponseDTO>;
}