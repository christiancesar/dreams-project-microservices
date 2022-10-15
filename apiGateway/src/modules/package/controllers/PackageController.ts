import { Request, Response } from "express";
import CreatePackageService from "../services/packages/CreatePackageService";

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

}

export default PackageControllers