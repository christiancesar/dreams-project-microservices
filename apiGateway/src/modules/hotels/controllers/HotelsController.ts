import { injectable } from "tsyringe";
import { FastifyReply } from "fastify";
import { CreateHotelBody, HotelIdParams } from "../../../schemas/hotels";
import CreateHotelService from "../services/hotels/CreateHotelService";
import ListHotelsService from "../services/hotels/ListHotelsService";
import ShowHotelService from "../services/hotels/ShowHotelService";

@injectable()
export default class HotelsController {
  async create(body: CreateHotelBody, reply: FastifyReply) {
    const createHotelService = new CreateHotelService();
    const hotelCreated = await createHotelService.execute(body)
    return reply.send(hotelCreated)
  }

  async show(params: HotelIdParams, reply: FastifyReply) {
    const showHotelService = new ShowHotelService();
    const hotels = await showHotelService.execute({ hotelId: params.hotelId })
    return reply.send(hotels)
  }

  async index(reply: FastifyReply) {
    const listHotelsService = new ListHotelsService();
    const hotels = await listHotelsService.execute();
    return reply.send(hotels)
  }
}
