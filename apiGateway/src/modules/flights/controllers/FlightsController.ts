import { FastifyReply } from "fastify";
import { injectable } from "tsyringe";
import { ZodRequest } from "../../../shared/http/types";
import { CreateFlightBody, FlightIdParams } from "../../../schemas/flights";
import CreateFlightService from "../services/flights/CreateFlightService";
import ListFlightsService from "../services/flights/ListFlightsService";
import ShowFlightService from "../services/flights/ShowFlightService";

@injectable()
export class FlightsController {

  async create(request: ZodRequest<{ body: typeof CreateFlightBody }>, reply: FastifyReply) {
    const createFlightService = new CreateFlightService();
    const flights = await createFlightService.execute(request.body)
    return reply.send(flights)
  }

  async show(request: ZodRequest<{ params: typeof FlightIdParams }>, reply: FastifyReply) {
    const showFlightService = new ShowFlightService();
    const flights = await showFlightService.execute({ flightId: request.params.flightId })
    return reply.send(flights)
  }

  async index(reply: FastifyReply) {
    const listFlightsService = new ListFlightsService();
    const flights = await listFlightsService.execute();
    return reply.send(flights)
  }
}
