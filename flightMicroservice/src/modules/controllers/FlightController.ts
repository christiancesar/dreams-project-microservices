import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateFlightStatusService } from "../services/flights/UpdateFlightStatusService";

export class FlightController {
  async update(request: Request, response: Response): Promise<Response> {
    const { flightId, eventName, errorDescription } = request.body;

    const updateFlightStatusService = container.resolve(UpdateFlightStatusService)

    await updateFlightStatusService.execute({
      flightId,
      eventName,
      errorDescription,
    })

    return response.json().status(200);
  }
}