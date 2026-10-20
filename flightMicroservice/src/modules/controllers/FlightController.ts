import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateFlightStatusService } from "../services/flights/UpdateFlightStatusService";

export class FlightController {
  async update(request: Request, response: Response): Promise<Response> {
    const { flightId, eventName, errorDescription } = request.body;

    try {
      const updateFlightStatusService = container.resolve(UpdateFlightStatusService);

      await updateFlightStatusService.execute({
        flightId,
        eventName,
        errorDescription,
      });

      return response.sendStatus(200);
    } catch (error) {
      const message = (error as Error).message;
      const status = message === "Flight not found" ? 404 : 500;
      return response.status(status).json({ message });
    }
  }
}
