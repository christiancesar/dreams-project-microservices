import { PackagesService } from "dreams-proto-sharing/src/contracts/package/package_grpc_pb";
import { Server, ServerCredentials } from "@grpc/grpc-js";
import { promisify } from "util";
import PackageServer from "./protos/implementations/PackageServiceProto";
import { prisma } from '../prisma';


const server = new Server()
server.addService(PackagesService, new PackageServer())

const bindPromise = promisify(server.bindAsync).bind(server)

bindPromise('0.0.0.0:50051', ServerCredentials.createInsecure())
  .then(async (port) => {
    await prisma.$connect()

    console.log(`listening on ${port}`)
    server.start()
  })
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect()
  })