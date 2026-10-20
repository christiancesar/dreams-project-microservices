import { CreatePackageDTO } from "../../dtos/CreatePackageDTO.js";
import { Package } from "../../entities/PackageEntity.js";

export interface IPackageRepository {
  create(data: CreatePackageDTO): Promise<Package>;
  findAllPackages(): Promise<Package[]>;
  findPackagesByUserId(userId: string): Promise<Package[]>;
}