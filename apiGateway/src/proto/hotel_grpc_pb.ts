// Wrapper ESM sobre dreams-proto-sharing/src/contracts/hotel/hotel_grpc_pb.js, que é CJS com exports dinâmicos.
import pb from 'dreams-proto-sharing/src/contracts/hotel/hotel_grpc_pb.js';
import type * as Types from 'dreams-proto-sharing/src/contracts/hotel/hotel_grpc_pb.js';

export const HotelsClient = pb.HotelsClient;
export type HotelsClient = Types.HotelsClient;
export const HotelsService = pb.HotelsService;
export type IHotelsClient = Types.IHotelsClient;
export type IHotelsServer = Types.IHotelsServer;
