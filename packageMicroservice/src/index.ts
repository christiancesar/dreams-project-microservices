import { Server, ServerCredentials } from "@grpc/grpc-js";
import { PackagesService } from "dreams-proto-sharing/src/contracts/package/package_grpc_pb";
import 'reflect-metadata';
import { promisify } from "util";
import { prisma } from '../prisma';
import PackageServer from "./protos/implementations/PackageServiceProto";
import './shared/container';

const gRPCserver = new Server()

gRPCserver.addService(PackagesService, new PackageServer())

const bindPromise = promisify(gRPCserver.bindAsync).bind(gRPCserver)

bindPromise('0.0.0.0:50051', ServerCredentials.createInsecure())
  .then(async (port) => {
    await prisma.$connect()

    console.log(`listening on ${port}`)
    gRPCserver.start()
  })
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect()
  })