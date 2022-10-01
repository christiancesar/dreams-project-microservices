import { Server, ServerCredentials } from "@grpc/grpc-js";
import { promisify } from "util";
import HotelServiceProto from "./protos/implementations/HotelServiceProto";
import { prisma } from '../prisma';
import { HotelsService } from "dreams-proto-sharing/src/contracts/hotel/hotel_grpc_pb";


const server = new Server()
server.addService(HotelsService, new HotelServiceProto())

const bindPromise = promisify(server.bindAsync).bind(server)

bindPromise('0.0.0.0:50054', ServerCredentials.createInsecure())
  .then(async (port) => {
    await prisma.$connect()

    console.log(`listening on ${port}`)
    server.start()
  })
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect()
  })