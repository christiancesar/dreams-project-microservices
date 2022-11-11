import { Server, ServerCredentials } from "@grpc/grpc-js";
import cors from 'cors';
import { HotelsService } from "dreams-proto-sharing/src/contracts/hotel/hotel_grpc_pb";
import express from 'express';
import "reflect-metadata";
import { promisify } from "util";
import { prisma } from '../prisma';
import HotelServiceProto from "./modules/protos/implementations/HotelServiceProto";
import routes from "./routes";
import "./shared/containers";

const server = express();

server.use(cors());

server.use(express.json());

server.use(routes);

const gRPCserver = new Server()
gRPCserver.addService(HotelsService, new HotelServiceProto())

const bindPromise = promisify(gRPCserver.bindAsync).bind(gRPCserver)

bindPromise('0.0.0.0:50054', ServerCredentials.createInsecure())
  .then(async (port) => {
    await prisma.$connect()

    console.log(`listening on ${port}`)
    gRPCserver.start()

    server.listen(3331, () => {
      console.log('Server listen on port 3331! 🍹')
    })
  })
  .catch(async (error) => {
    await prisma.$disconnect();
    console.error(error)
  })