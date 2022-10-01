import { PackagesByUserRequest, PackagesResponse } from "dreams-proto-sharing/src/contracts/package/package_pb";
import packageClient from "../../providers/PackageService";


type PackageRequest = {
  userId: string;
}
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

class ListPackagesByUserService {

  async execute({ userId }: PackageRequest): Promise<PackageResponse[]> {

    const listPackageByUserService = ({ userId }: PackageRequest) => new Promise<PackagesResponse>((resolve, reject) => {
      packageClient.listPackageByUser(
        new PackagesByUserRequest().setUserid(userId), (err, packages) => {
          if (err) {
            reject(err);
          }
          resolve(packages);
        }
      )
    });
    const packageListResponse = await listPackageByUserService({ userId })

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

export default ListPackagesByUserService