import "reflect-metadata"
import { UsersService } from "dreams-proto-sharing/src/contracts/user/user_grpc_pb";
import { Server, ServerCredentials } from "@grpc/grpc-js";
import { promisify } from "util";
import UsersServer from "./protos/implementations/UserServiceProto";
import { prisma } from '../prisma';
import "./container"

const server = new Server()
server.addService(UsersService, new UsersServer())

const bindPromise = promisify(server.bindAsync).bind(server)

bindPromise('0.0.0.0:50052', ServerCredentials.createInsecure())
  .then(async (port) => {
    await prisma.$connect()

    console.log(`listening on ${port}`)
    server.start()
  })
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect()
  })