import type { FastifyReply, FastifyRequest } from "fastify";
import { container } from "tsyringe";
import { UpdateFlightStatusService } from "../services/flights/UpdateFlightStatusService.js";

export type UpdateFlightBody = {
  flightId: string;
  eventName: string;
  errorDescription?: string;
};

export class FlightController {
  async update(request: FastifyRequest<{ Body: UpdateFlightBody }>, reply: FastifyReply) {
    const { flightId, eventName, errorDescription } = request.body;

    try {
      const updateFlightStatusService = container.resolve(UpdateFlightStatusService);

      await updateFlightStatusService.execute({
        flightId,
        eventName,
        errorDescription: errorDescription ?? "",
      });

      return reply.code(200).send("OK");
    } catch (error) {
      const message = (error as Error).message;
      const status = message === "Flight not found" ? 404 : 500;
      return reply.code(status).send({ message });
    }
  }
}
