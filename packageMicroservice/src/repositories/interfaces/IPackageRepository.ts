import { CreatePackageDTO } from "../../dtos/CreatePackageDTO";
import { Package } from "../../entities/PackageEntity";

export interface IPackageRepository {
  create(data: CreatePackageDTO): Promise<Package>;
  findAllPackages(): Promise<Package[]>;
  findPackagesByUserId(userId: string): Promise<Package[]>;
}