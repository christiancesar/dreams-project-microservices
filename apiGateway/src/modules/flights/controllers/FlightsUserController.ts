import { FastifyReply } from "fastify";
import { injectable } from "tsyringe";
import { ZodRequest } from "../../../shared/http/types";
import { FlightUserParams } from "../../../schemas/flights";
import ListFlightsByUserService from "../services/FlightUser/ListFlightsByUserService";

@injectable()
class FlightsUserController {
  async index(request: ZodRequest<{ params: typeof FlightUserParams }>, reply: FastifyReply) {
    const listFlightsByUserService = new ListFlightsByUserService();
    const flights = await listFlightsByUserService.execute({ userId: request.params.userId });
    return reply.send(flights)
  }
}

export default FlightsUserController;
