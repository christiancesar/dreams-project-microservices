import { PackagesResponse } from "dreams-proto-sharing/src/contracts/package/package_pb";
import { Empty } from "google-protobuf/google/protobuf/empty_pb";
import packageClient from "../../providers/PackageService";

type PackageResponse = {
  id: string;
  hotel: {
    hotel: any;
    offers: any;
  };
  flight: {
    itineraries: any;
    price: any;
  };
  createdAt: Date;
  updatedAt: Date;
  amount: number;
  off: number;
}

class ListPackagesService {
  async execute(): Promise<PackageResponse[]> {

    const packageListService = () => new Promise<PackagesResponse>((resolve, reject) => {
      packageClient.listPackages(
        new Empty(), (err, packages) => {
          if (err) {
            reject(err);
          }
          resolve(packages);
        }
      )
    });
    const packageListResponse = await packageListService()

    const packagesResponseList = packageListResponse.getPackageresponseList();

    const packages: PackageResponse[] = [];

    packagesResponseList.map((package_) => {
      const packageObject = package_.toObject();

      packages.push({
        id: packageObject.id,
        flight: {
          itineraries: JSON.parse(packageObject.flight!.intinerantes),
          price: JSON.parse(packageObject.flight!.price)
        },
        hotel: {
          hotel: JSON.parse(packageObject.hotel!.hotel),
          offers: JSON.parse(packageObject.hotel!.offers)
        },
        amount: packageObject.amount,
        off: packageObject.off,
        createdAt: new Date(packageObject.createdat),
        updatedAt: new Date(packageObject.updatedat),
      })
    })
    return packages;
  }
}

export default ListPackagesService;