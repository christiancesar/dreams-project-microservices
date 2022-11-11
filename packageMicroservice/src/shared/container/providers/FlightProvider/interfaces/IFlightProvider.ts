import { CreateFlightRequestDTO } from "../dtos/CreateFlightRequestDTO";
import { CreateFlightResponseDTO } from "../dtos/CreateFlightResponseDTO";
import { FlightOffersSearchRequestDTO } from "../dtos/FlightOffersSearchRequestDTO";
import { FlightOffersSearchResponseDTO } from "../dtos/FlightOffersSearchResponseDTO";
import { ShowFlightRequestDTO } from "../dtos/ShowFlightRequestDTO";
import { ShowFlightResponseDTO } from "../dtos/ShowFlightResponseDTO";

export interface IFlightProvider {
  createFlight(flight: CreateFlightRequestDTO): Promise<CreateFlightResponseDTO>;
  showFlight(flight: ShowFlightRequestDTO): Promise<ShowFlightResponseDTO>;
  flightOffersSearch(flight: FlightOffersSearchRequestDTO): Promise<FlightOffersSearchResponseDTO>;
}