import { Request, Response } from "express";
import ListFlightsByUserService from "../services/flightUser/ListFlightsByUserService";

class FlightsUserController {
  async index(request: Request, response: Response): Promise<Response> {
    const { userId } = request.params
    const listFlightsByUserService = new ListFlightsByUserService();
    const flights = await listFlightsByUserService.execute({ userId });
    return response.json(flights)
  }
}

export default FlightsUserController;