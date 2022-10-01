import { Package } from "@prisma/client";
import { prisma } from "../../../prisma";
import { ICreatePackageDTO } from "../../dtos/ICreatePackageDTO";

interface IPackageRepository {
  create(data: ICreatePackageDTO): Promise<Package>;
  findAllPackages(): Promise<Package[]>;
  findPackagesByUserId(userId: string): Promise<Package[]>;
}

class PackageRepository implements IPackageRepository {

  async create(data: ICreatePackageDTO): Promise<Package> {
    const packageCreated = await prisma.package.create({ data });
    return packageCreated;
  }

  async findAllPackages(): Promise<Package[]> {
    return prisma.package.findMany();
  }

  async findPackagesByUserId(userId: string): Promise<Package[]> {
    return prisma.package.findMany({ where: { userId: userId } });
  }

}

export default PackageRepository;