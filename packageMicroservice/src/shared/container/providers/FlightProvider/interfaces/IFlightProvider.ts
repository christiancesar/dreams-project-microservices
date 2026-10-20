import { CreateFlightRequestDTO } from "../dtos/CreateFlightRequestDTO.js";
import { CreateFlightResponseDTO } from "../dtos/CreateFlightResponseDTO.js";
import { FlightOffersSearchRequestDTO } from "../dtos/FlightOffersSearchRequestDTO.js";
import { FlightOffersSearchResponseDTO } from "../dtos/FlightOffersSearchResponseDTO.js";
import { ShowFlightRequestDTO } from "../dtos/ShowFlightRequestDTO.js";
import { ShowFlightResponseDTO } from "../dtos/ShowFlightResponseDTO.js";

export interface IFlightProvider {
  createFlight(flight: CreateFlightRequestDTO): Promise<CreateFlightResponseDTO>;
  showFlight(flight: ShowFlightRequestDTO): Promise<ShowFlightResponseDTO>;
  flightOffersSearch(flight: FlightOffersSearchRequestDTO): Promise<FlightOffersSearchResponseDTO>;
}