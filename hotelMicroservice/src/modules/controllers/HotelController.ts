import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateHotelStatusService } from "../services/hotels/UpdateHotelStatusService";

export class HotelController {
  async update(request: Request, response: Response): Promise<Response> {
    const { hotelId, eventName, errorDescription } = request.body;

    try {
      const updateHotelStatusService = container.resolve(UpdateHotelStatusService);

      await updateHotelStatusService.execute({
        hotelId,
        eventName,
        errorDescription,
      });

      return response.sendStatus(200);
    } catch (error) {
      const message = (error as Error).message;
      const status = message === "Hotel not found" ? 404 : 500;
      return response.status(status).json({ message });
    }
  }
}
