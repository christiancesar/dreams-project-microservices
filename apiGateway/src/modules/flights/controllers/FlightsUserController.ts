import { injectable } from "tsyringe";
import { FastifyReply } from "fastify";
import { FlightUserParams } from "../../../schemas/flights";
import ListFlightsByUserService from "../services/FlightUser/ListFlightsByUserService";

@injectable()
class FlightsUserController {
  async index(params: FlightUserParams, reply: FastifyReply) {
    const listFlightsByUserService = new ListFlightsByUserService();
    const flights = await listFlightsByUserService.execute({ userId: params.userId });
    return reply.send(flights)
  }
}

export default FlightsUserController;
