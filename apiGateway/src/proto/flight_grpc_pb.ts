// Wrapper ESM sobre dreams-proto-sharing/src/contracts/flight/flight_grpc_pb.js, que é CJS com exports dinâmicos.
import pb from 'dreams-proto-sharing/src/contracts/flight/flight_grpc_pb.js';
import type * as Types from 'dreams-proto-sharing/src/contracts/flight/flight_grpc_pb.js';

export const FlightsClient = pb.FlightsClient;
export type FlightsClient = Types.FlightsClient;
export const FlightsService = pb.FlightsService;
export type IFlightsClient = Types.IFlightsClient;
export type IFlightsServer = Types.IFlightsServer;
