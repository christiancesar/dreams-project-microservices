import { CreateHotelRequestDTO } from "../dtos/CreateHotelRequestDTO.js";
import { CreateHotelResponseDTO } from "../dtos/CreateHotelResponseDTO.js";
import { HotelOffersSearchRequestDTO } from "../dtos/HotelOffersSearchRequestDTO.js";
import { HotelOffersSearchResponseDTO } from "../dtos/HotelOffersSearchResponseDTO.js";
import { ShowHotelRequestDTO } from "../dtos/ShowHotelRequestDTO.js";
import { ShowHotelResponseDTO } from "../dtos/ShowHotelResponseDTO.js";

export interface IHotelProvider {
  createHotel(hotel: CreateHotelRequestDTO): Promise<CreateHotelResponseDTO>;
  showHotel(hotel: ShowHotelRequestDTO): Promise<ShowHotelResponseDTO>;
  hotelOffersSearch(flight: HotelOffersSearchRequestDTO): Promise<HotelOffersSearchResponseDTO>;
}