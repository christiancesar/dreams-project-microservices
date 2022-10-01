import { Flight, Hotel, PackageCreate, PackagesResponse, PackageCreateRequest } from "dreams-proto-sharing/src/contracts/package/package_pb";
import packageClient from "../../providers/PackageService";

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

type PackageRequest = {
  userId: string;
  hotel: {
    hotel: any;
    offers: any;
  };
  flight: {
    itineraries: any;
    price: any;
  };
  amount: number;
  off: number;
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

class CreatePackageService {
  async execute({ userId, flight, hotel, amount, off }: PackageRequest): Promise<PackageResponse[]> {


    const packageCreateRequest = (packageCreate: PackageCreateRequestDTO) => new Promise<PackagesResponse>((resolve, reject) => {
      packageClient.createPackage(
        new PackageCreateRequest().setPackagecreate(
          new PackageCreate()
            .setUserid(packageCreate.userId)
            .setFlight(
              new Flight()
                .setIntinerantes(packageCreate.flight.itineraries)
                .setPrice(packageCreate.flight.itineraries)
            )
            .setHotel(
              new Hotel()
                .setHotel(packageCreate.hotel.hotel)
                .setOffers(packageCreate.hotel.offers)
            )
            .setAmount(packageCreate.amount)
            .setOff(packageCreate.off)
        ), (err, packages) => {
          if (err) {
            reject(err);
          }
          resolve(packages);
        }
      )
    });

    const packageCreatedResponse = await packageCreateRequest({
      userId,
      flight: {
        itineraries: JSON.stringify(flight.itineraries),
        price: JSON.stringify(flight.price)
      },
      hotel: {
        hotel: JSON.stringify(hotel.hotel),
        offers: JSON.stringify(hotel.offers)
      },
      amount,
      off
    })

    const packagesResponseList = packageCreatedResponse.getPackageresponseList();

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

export default CreatePackageService;