import { Request, Response } from "express";
import ListFlightsByUserService from "../services/FlightUser/ListFlightsByUserService";

class FlightsUserController {
  async index(request: Request, response: Response): Promise<Response> {
    const { userId } = request.params
    const listFlightsByUserService = new ListFlightsByUserService();
    const flights = await listFlightsByUserService.execute({ userId });
    return response.json(flights)
  }
}

export default FlightsUserController;