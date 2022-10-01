import { Request, Response } from "express"
import CreatePackageService from "../services/packages/CreatePackageService"
import ListPackagesService from "../services/packages/ListPackagesService";

class PackageControllers {

  async create(request: Request, response: Response): Promise<Response> {
    const { userId, flight, hotel, amount, off } = request.body;

    const createPackageService = new CreatePackageService();

    const packageCreated = await createPackageService.execute({
      userId,
      flight,
      hotel,
      amount,
      off
    })

    return response.json(packageCreated)
  }

  async index(request: Request, response: Response): Promise<Response> {
    const listPackagesService = new ListPackagesService();
    const packages = await listPackagesService.execute();
    return response.json(packages)
  }

}

export default PackageControllers