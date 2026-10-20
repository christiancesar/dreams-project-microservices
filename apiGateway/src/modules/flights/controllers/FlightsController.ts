import { FastifyReply } from "fastify";
import { CreateFlightBody, FlightIdParams } from "../../../schemas/flights";
import CreateFlightService from "../services/flights/CreateFlightService";
import ListFlightsService from "../services/flights/ListFlightsService";
import ShowFlightService from "../services/flights/ShowFlightService";

export class FlightsController {

  async create(body: CreateFlightBody, reply: FastifyReply) {
    const createFlightService = new CreateFlightService();
    const flights = await createFlightService.execute(body)
    return reply.send(flights)
  }

  async show(params: FlightIdParams, reply: FastifyReply) {
    const showFlightService = new ShowFlightService();
    const flights = await showFlightService.execute({ flightId: params.flightId })
    return reply.send(flights)
  }

  async index(reply: FastifyReply) {
    const listFlightsService = new ListFlightsService();
    const flights = await listFlightsService.execute();
    return reply.send(flights)
  }
}
