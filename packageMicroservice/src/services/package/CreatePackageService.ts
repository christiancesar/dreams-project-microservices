import { inject, injectable } from 'tsyringe';
import { IPackageRepository } from '../../repositories/interfaces/IPackageRepository';
import { IFlightProvider } from '../../shared/container/providers/FlightProvider/interfaces/IFlightProvider';
import { IHotelProvider } from '../../shared/container/providers/HotelProvider/interface/IHotelProvider';
import PackageTripEventHandle, { PackageEventParams } from '../../shared/events/PackageTripEventHandle';

type PackageCreateRequestDTO = {
  userId: string;
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
export class CreatePackageService {


  constructor(
    @inject('PackageRepository')
    private packageRepository: IPackageRepository,
    @inject('FlightProvider')
    private flightDreamsProvider: IFlightProvider,
    @inject('HotelProvider')
    private hotelProvider: IHotelProvider
  ) { }

  async execute({ userId, hotel, flight, amount, off }: PackageCreateRequestDTO): Promise<PackageCreateResponseDTO> {
    
    const flightResponse = await this.flightDreamsProvider.createFlight({
      itineraries: flight.itineraries,
      price: flight.price,
      userId: userId
    })

    const hotelResponse = await this.hotelProvider.createHotel({
      hotel: hotel.hotel,
      offers: hotel.offers,
      userId
    }).catch(err => {
      PackageTripEventHandle.event({
        eventName: 'CREATE_HOTEL_ERROR',
        errorDescription: err.message,
        flightId: flightResponse.id,
      } as PackageEventParams);
    })

    const package_ = await this.packageRepository.create({
      userId,
      flightId: flightResponse.id,
      hotelId: hotelResponse!.id,
      amount,
      off
    }).catch(err => {
      PackageTripEventHandle.event({
        eventName: 'CREATE_HOTEL_ERROR',
        errorDescription: err.message,
        flightId: flightResponse.id,
        hotelId: hotelResponse!.id
      } as PackageEventParams);
    });

    return {
      id: package_!.id,
      hotel: {
        hotel: hotelResponse!.hotel,
        offers: hotelResponse!.offers,
      },
      flight: {
        itineraries: flightResponse.itineraries,
        price: flightResponse.price,
      },
      amount: Number(package_!.amount.toFixed(2)),
      off: package_!.off,
      createdAt: Date.parse(package_!.createdAt.toDateString()),
      updatedAt: Date.parse(package_!.updatedAt.toDateString()),
    }
  }
}
