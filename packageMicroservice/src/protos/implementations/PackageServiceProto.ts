
import grpc, { ServerErrorResponse } from "@grpc/grpc-js";
import CreatePackageService from "../../services/package/CreatePackageService";
import AssemblingPackageService from "../../services/packageOffers/AssemblingPackageService";
import { IPackagesServer } from "dreams-proto-sharing/src/contracts/package/package_grpc_pb";
import {
  Flight,
  Hotel,
  PackageResponse,
  PackagesResponse,
  PackageCreateRequest,
  PackageSearchRequest,
  PackageSearchResponse,
  PackagesByUserRequest
} from "dreams-proto-sharing/src/contracts/package/package_pb";
import { Empty } from "google-protobuf/google/protobuf/empty_pb";
import ListPackagesByUserService from "../../services/packageUser/ListPackagesByUserService";
import ListPackagesService from "../../services/package/ListPackagesService";


class PackagesServer implements IPackagesServer {
  listPackages: grpc.handleUnaryCall<Empty, PackagesResponse> = async (call, callback): Promise<void> => {
    try {
      const packageResponse = new PackagesResponse();
      const listPackagesService = new ListPackagesService();
      
      const packages = await listPackagesService.execute();

      packages.map((package_) => {
        packageResponse.addPackageresponse(
          new PackageResponse()
            .setId(package_.id)
            .setFlight(
              new Flight()
                .setIntinerantes(package_.flight.itineraries)
                .setPrice(package_.flight.price)
            )
            .setHotel(
              new Hotel()
                .setHotel(package_.hotel.hotel)
                .setOffers(package_.hotel.offers)
            )
            .setAmount(package_.amount)
            .setOff(package_.off)
            .setUpdatedat(package_.updatedAt)
            .setCreatedat(package_.createdAt)
        )
      })
      callback(null, packageResponse);
    } catch (error) {
      callback(error as ServerErrorResponse, null);
    }
  }

  listPackageByUser: grpc.handleUnaryCall<PackagesByUserRequest, PackagesResponse> = async (call, callback): Promise<void> => {
    try {
      const userId = call.request.getUserid();
      const packageResponse = new PackagesResponse();
      const listPackagesByUser = new ListPackagesByUserService();

      const packages = await listPackagesByUser.execute({ userId });

      packages.map((package_) => {
        packageResponse.addPackageresponse(
          new PackageResponse()
            .setId(package_.id)
            .setFlight(
              new Flight()
                .setIntinerantes(package_.flight.itineraries)
                .setPrice(package_.flight.price)
            )
            .setHotel(
              new Hotel()
                .setHotel(package_.hotel.hotel)
                .setOffers(package_.hotel.offers)
            )
            .setAmount(package_.amount)
            .setOff(package_.off)
            .setUpdatedat(package_.updatedAt)
            .setCreatedat(package_.createdAt)
        )
      })
      callback(null, packageResponse);
    } catch (error) {
      callback(error as ServerErrorResponse, null);
    }
  }

  createPackage: grpc.handleUnaryCall<PackageCreateRequest, PackagesResponse> = async (call, callback): Promise<void> => {
    try {
      const packageRequest = call.request.getPackagecreate()!.toObject();
      const packageResponse = new PackagesResponse();
      const createPackageService = new CreatePackageService();

      const package_ = await createPackageService.execute({
        userId: packageRequest.userid,
        flight: {
          itineraries: packageRequest.flight!.intinerantes,
          price: packageRequest.flight!.price
        },
        hotel: {
          hotel: packageRequest.hotel!.hotel,
          offers: packageRequest.hotel!.offers
        },
        amount: packageRequest.amount,
        off: packageRequest.off
      });

      packageResponse.addPackageresponse(
        new PackageResponse()
          .setId(package_.id)
          .setFlight(
            new Flight()
              .setIntinerantes(package_.flight.itineraries)
              .setPrice(package_.flight.price)
          )
          .setHotel(
            new Hotel()
              .setHotel(package_.hotel.hotel)
              .setOffers(package_.hotel.offers)
          )
          .setAmount(package_.amount)
          .setOff(package_.off)
          .setUpdatedat(package_.updatedAt)
          .setCreatedat(package_.createdAt)
      );

      callback(null, packageResponse);
    } catch (error) {
      callback(error as ServerErrorResponse, null);
    }
  }

  searchPackage: grpc.handleUnaryCall<PackageSearchRequest, PackageSearchResponse> = async (call, callback): Promise<void> => {
    try {
      const packageSearchRequest = call.request.getPackagesearch()!.toObject();
      const packageSearchResponse = new PackageSearchResponse();
      const assemblingPackageService = new AssemblingPackageService();

      const packages = await assemblingPackageService.execute({
        adults: packageSearchRequest.adults,
        children: packageSearchRequest.children,
        departureDate: packageSearchRequest.departuredate,
        destinationLocationCode: packageSearchRequest.destinationlocationcode,
        infants: packageSearchRequest.infants,
        originLocationCode: packageSearchRequest.originlocationcode,
        returnDate: packageSearchRequest.returndate,
        travelClass: packageSearchRequest.travelclass,
        roomQuantity: packageSearchRequest.roomquantity
      })

      packageSearchResponse.setPackage(JSON.stringify(packages));

      callback(null, packageSearchResponse);
    } catch (error) {
      callback(error as ServerErrorResponse, null);
    }
  }

  [name: string]: grpc.UntypedHandleCall;
}

export default PackagesServer;