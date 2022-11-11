import { inject, injectable } from "tsyringe";
import { IPackageRepository } from "../../repositories/interfaces/IPackageRepository";
import { IFlightProvider } from "../../shared/container/providers/FlightProvider/interfaces/IFlightProvider";
import { IHotelProvider } from "../../shared/container/providers/HotelProvider/interface/IHotelProvider";

type PackagesByUserRequest = {
  userId: string
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

@injectable()
export class ListPackagesByUserService {

  constructor(
    @inject('PackageRepository')
    private packageRepository: IPackageRepository,
    @inject('FlightProvider')
    private flightDreamsProvider: IFlightProvider,
    @inject('HotelProvider')
    private hotelDreamsProvider: IHotelProvider
  ) { }

  async execute({ userId }: PackagesByUserRequest): Promise<PackageCreateResponseDTO[]> {

    const packages = await this.packageRepository.findPackagesByUserId(userId);

    // const packagesFmt: PackageCreateResponseDTO[] = [];

    const packagesFmt = await Promise.all(
      packages.map(
        async (package_) => {

          const flightResponse = await this.flightDreamsProvider.showFlight({ flightId: package_.flightId });

          const showHotelResponse = await this.hotelDreamsProvider.showHotel({ hotelId: package_.hotelId });

          return {
            id: package_.id,
            flight: {
              itineraries: flightResponse.itineraries,
              price: flightResponse.price,
            },
            hotel: {
              hotel: showHotelResponse.hotel,
              offers: showHotelResponse.offers,
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
