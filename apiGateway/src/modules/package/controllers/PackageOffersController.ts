import { Request, Response } from "express";
import AssemblingPackageService from "../services/packageOffers/AssemblingPackageService";

export default class PackageOffersControllers {
  
  async index(request: Request, response: Response): Promise<Response> {
    const {
      adults,
      children,
      departureDate,
      destinationLocationCode,
      infants,
      originLocationCode,
      returnDate,
      travelClass,
      roomQuantity
    } = request.body;
    const assemblingPackageService = new AssemblingPackageService();

    const packages = await assemblingPackageService.execute({
      adults,
      children,
      departureDate,
      destinationLocationCode,
      infants,
      originLocationCode,
      returnDate,
      travelClass,
      roomQuantity
    })

    return response.json(packages)
  }
}