import { inject, injectable } from "tsyringe";
import { FlightOffer } from "../../@types/amadeus/flights/FlightOfferSearchResponse";
import { HotelOffer } from "../../@types/amadeus/hotels/HotelOfferSearchResponse";
import { AssemblingPackageServiceRequestDTO } from "../../dtos/AssemblingPackageServiceRequestDTO";
import { AssemblingPackageServiceResponse } from "../../dtos/AssemblingPackageServiceResponse";
import { IFlightProvider } from "../../shared/container/providers/FlightProvider/interfaces/IFlightProvider";
import { IHotelProvider } from "../../shared/container/providers/HotelProvider/interface/IHotelProvider";

@injectable()
export class AssemblingPackageService {
  constructor(
    @inject('FlightProvider')
    private flightDreamsProvider: IFlightProvider,
    @inject('HotelProvider')
    private hotelProvider: IHotelProvider
  ) { }
  async execute({
    adults,
    children,
    departureDate,
    destinationLocationCode,
    infants,
    originLocationCode,
    returnDate,
    travelClass,
    roomQuantity
  }: AssemblingPackageServiceRequestDTO): Promise<AssemblingPackageServiceResponse[]> {
    // if (!isMatch(departureDate, 'yyyy-MM-dd')) {
    //   throw new AppError("Formart departure date not match, example format yyyy-MM-dd.");
    // }

    // const parts = departureDate.split('-')

    // const newDateFepartureDate = new Date(Number(parts[0]), Number(parts[1]), Number(parts[2]))

    // if (isYesterday(newDateFepartureDate)) {
    //   throw new AppError("You can't search in the past.");
    // }

    const flightOffersResponse = await this.flightDreamsProvider.flightOffersSearch({
      adults,
      departureDate,
      destinationLocationCode,
      originLocationCode,
      travelClass,
      children,
      infants,
      returnDate
    })

    const hotelOffersResponse = await this.hotelProvider.hotelOffersSearch({
      cityCode: destinationLocationCode,
      checkInDate: departureDate,
      checkOutDate: returnDate,
      roomQuantity,
      adults,
    })
    
    const hotels = JSON.parse(hotelOffersResponse.hoteloffers) as HotelOffer[];
    
    const flights = JSON.parse(flightOffersResponse.flightoffers) as FlightOffer[];

    let packages = [] as AssemblingPackageServiceResponse[];

    if (hotels.length < flights.length) {
      for (let index = 0; index < hotels.length; index++) {
        packages.push({
          flight: flights[index],
          hotel: hotels[index],
          amount: Number(hotels[index].offers[0].price.total) + Number(flights[index].price.total),
          off: Math.floor(Math.random() * (50 - 0)) + 0,
        } as AssemblingPackageServiceResponse)

      }
    } else {
      for (let index = 0; index < flights.length; index++) {
        packages.push({
          flight: flights[index],
          hotel: hotels[index],
          amount: Number(hotels[index].offers[0].price.total) + Number(flights[index].price.total),
          off: Math.floor(Math.random() * (50 - 0)) + 0,
        })

      }
    }

    return packages;
  }
}