import { PackageSearch, PackageSearchRequest, PackageSearchResponse } from "dreams-proto-sharing/src/contracts/package/package_pb";
import packageClient from "../../providers/PackageService";
import { FlightOffer } from "../../../../@types/amadeus/flights/FlightOfferSearchResponse";
import { HotelOffer } from "../../../../@types/amadeus/hotels/HotelOfferSearchResponse";

type PackageOffersResponse = {
  flight: FlightOffer;
  hotel: HotelOffer;  
  off: number;  
  total: number;
}

type PackageOffersRequest = {
  originLocationCode: string;
  destinationLocationCode: string;
  departureDate: string;
  returnDate: string;
  adults: number;
  children: number;
  infants: number;
  travelClass: string;
  roomQuantity: number;
}

export default class AssemblingPackageService {
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
  }: PackageOffersRequest): Promise<PackageOffersResponse[]> {
    
    const packageOffersRequestService = (search: PackageOffersRequest) => new Promise<PackageSearchResponse>((resolve, reject) => {
      packageClient.searchPackage(
        new PackageSearchRequest().setPackagesearch(
          new PackageSearch()
          .setAdults(search.adults)
          .setChildren(search.children)
          .setDeparturedate(search.departureDate)
          .setDestinationlocationcode(search.destinationLocationCode)
          .setInfants(search.infants)
          .setOriginlocationcode(search.originLocationCode)
          .setReturndate(search.returnDate)
          .setTravelclass(search.travelClass)
          .setRoomquantity(search.roomQuantity)
        ), (err, packages) => {
          if (err) {
            reject(err)
          }
          resolve(packages)
        }
      );
    });

    const packageOffersResponse = await packageOffersRequestService({
      adults,
      children,
      departureDate,
      destinationLocationCode,
      infants,
      originLocationCode,
      returnDate,
      travelClass,
      roomQuantity
    });

    const packages = JSON.parse(packageOffersResponse.getPackage()) as PackageOffersResponse[];

    return packages 
  }
}