import { Package } from "@prisma/client";
import { prisma } from "../../../prisma";
import { CreatePackageDTO } from "../../dtos/CreatePackageDTO";
import { IPackageRepository } from "../interfaces/IPackageRepository";

class PackageRepository implements IPackageRepository {

  async create(data: CreatePackageDTO): Promise<Package> {
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