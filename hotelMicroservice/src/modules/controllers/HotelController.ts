import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateHotelStatusService } from "../services/hotels/UpdateHotelStatusService";

export class HotelController {
  async update(request: Request, response: Response): Promise<Response> {
    const { hotelId, eventName, errorDescription } = request.body;

    const updateHotelStatusService = container.resolve(UpdateHotelStatusService)

    await updateHotelStatusService.execute({
      hotelId,
      eventName,
      errorDescription,
    })

    return response.json().status(200);
  }
}