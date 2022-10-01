import {
  FlightResponse as FlightShowResponse,
  FlightShowRequest
} from "dreams-proto-sharing/src/contracts/flight/flight_pb";
import flightClient from "../../providers/FlightService";
import PackageRepository from "../../repositories/implementations/PackageRepository";
import {
  HotelResponse as HotelShowResponse,
  HotelShowRequest
} from "dreams-proto-sharing/src/contracts/hotel/hotel_pb";
import hotelClient from "../../providers/HotelService";

type FlightRequest = {
  flightId: string
}

type HotelRequest = {
  hotelId: string
}

type PackageCreateResponseDTO = {
  id: string
  hotel: {
    hotel: string;
    offers: string;
  };
  flight: {
    itineraries: string;
    price: string;
  };
  amount: number;
  off: number;
  createdAt: number;
  updatedAt: number;
}

class ListPackagesService {

  private packageRepository: PackageRepository;

  constructor() {
    this.packageRepository = new PackageRepository();
  }

  async execute(): Promise<PackageCreateResponseDTO[]> {
    const packages = await this.packageRepository.findAllPackages();

    const showFlightServiceRequest = (flight: FlightRequest) => new Promise<FlightShowResponse>((resolve, reject) => {
      flightClient.showFlight(
        new FlightShowRequest().setId(flight.flightId),
        (err, flight) => {
          if (err) {
            reject(err)
          }
          resolve(flight)
        }
      );
    });

    const showHotelServiceRequest = (hotel: HotelRequest) => new Promise<HotelShowResponse>((resolve, reject) => {
      hotelClient.showHotel(
        new HotelShowRequest().setId(hotel.hotelId),
        (err, hotel) => {
          if (err) {
            reject(err)
          }
          resolve(hotel)
        }
      );
    });

    const packagesFmt = await Promise.all(
      packages.map(
        async (package_) => {

          const flightResponse = await showFlightServiceRequest({ flightId: package_.flightId });

          const flight = flightResponse.getFlight()!.toObject();

          const showHotelResponse = await showHotelServiceRequest({ hotelId: package_.hotelId });

          const hotel = showHotelResponse.getHotel()!.toObject();

          return {
            id: package_.id,
            flight: {
              itineraries: flight.itineraries,
              price: flight.price,
            },
            hotel: {
              hotel: hotel.hotel,
              offers: hotel.offers,
            },
            amount: Number(package_.amount.toFixed(2)),
            off: package_.off,
            createdAt: Date.parse(package_.createdAt.toDateString()),
            updatedAt: Date.parse(package_.updatedAt.toDateString())
          }
        }
      )
    )

    return packagesFmt;
  }
}

export default ListPackagesService;