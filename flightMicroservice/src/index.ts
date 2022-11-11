import { Server, ServerCredentials } from "@grpc/grpc-js";
import cors from 'cors';
import { FlightsService } from "dreams-proto-sharing/src/contracts/flight/flight_grpc_pb";
import express from 'express';
import "reflect-metadata";
import { promisify } from "util";
import { prisma } from '../prisma';
import FlightServiceProto from "./modules/protos/implementations/FlightServiceProto";
import routes from "./routes";
import "./shared/containers";

const server = express();

server.use(cors());

server.use(express.json());

server.use(routes);

const gRPCserver = new Server()
gRPCserver.addService(FlightsService, new FlightServiceProto())

const bindPromise = promisify(gRPCserver.bindAsync).bind(gRPCserver)

bindPromise('0.0.0.0:50053', ServerCredentials.createInsecure())
  .then(async (port) => {
    await prisma.$connect()

    console.log(`listening on ${port}`)
    gRPCserver.start()

    server.listen(3332, () => {
      console.log('Server listen on port 3332! 🍹')
    })
  })
  .catch(async (error) => {
    await prisma.$disconnect();
    console.error(error)
  })