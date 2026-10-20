// Wrapper ESM sobre dreams-proto-sharing/src/contracts/package/package_grpc_pb.js, que é CJS com exports dinâmicos.
import pb from 'dreams-proto-sharing/src/contracts/package/package_grpc_pb.js';
import type * as Types from 'dreams-proto-sharing/src/contracts/package/package_grpc_pb.js';

export type IPackagesClient = Types.IPackagesClient;
export type IPackagesServer = Types.IPackagesServer;
export const PackagesClient = pb.PackagesClient;
export type PackagesClient = Types.PackagesClient;
export const PackagesService = pb.PackagesService;
