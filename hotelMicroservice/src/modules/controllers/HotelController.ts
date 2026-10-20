import type { FastifyReply, FastifyRequest } from "fastify";
import { container } from "tsyringe";
import { UpdateHotelStatusService } from "../services/hotels/UpdateHotelStatusService.js";

export type UpdateHotelBody = {
  hotelId: string;
  eventName: string;
  errorDescription?: string;
};

export class HotelController {
  async update(request: FastifyRequest<{ Body: UpdateHotelBody }>, reply: FastifyReply) {
    const { hotelId, eventName, errorDescription } = request.body;

    try {
      const updateFlightStatusService = container.resolve(UpdateHotelStatusService);

      await updateFlightStatusService.execute({
        hotelId,
        eventName,
        errorDescription: errorDescription ?? "",
      });

      return reply.code(200).send("OK");
    } catch (error) {
      const message = (error as Error).message;
      const status = message === "Hotel not found" ? 404 : 500;
      return reply.code(status).send({ message });
    }
  }
}
