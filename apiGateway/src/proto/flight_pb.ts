// Wrapper ESM sobre dreams-proto-sharing/src/contracts/flight/flight_pb.js, que é CJS com exports dinâmicos.
import pb from 'dreams-proto-sharing/src/contracts/flight/flight_pb.js';
import type * as Types from 'dreams-proto-sharing/src/contracts/flight/flight_pb.js';

export const Flight = pb.Flight;
export type Flight = Types.Flight;
export const FlightByUserRequest = pb.FlightByUserRequest;
export type FlightByUserRequest = Types.FlightByUserRequest;
export const FlightCreate = pb.FlightCreate;
export type FlightCreate = Types.FlightCreate;
export const FlightCreateRequest = pb.FlightCreateRequest;
export type FlightCreateRequest = Types.FlightCreateRequest;
export const FlightListResponse = pb.FlightListResponse;
export type FlightListResponse = Types.FlightListResponse;
export const FlightOffersRequest = pb.FlightOffersRequest;
export type FlightOffersRequest = Types.FlightOffersRequest;
export const FlightOffersResponse = pb.FlightOffersResponse;
export type FlightOffersResponse = Types.FlightOffersResponse;
export const FlightOffersSearch = pb.FlightOffersSearch;
export type FlightOffersSearch = Types.FlightOffersSearch;
export const FlightResponse = pb.FlightResponse;
export type FlightResponse = Types.FlightResponse;
export const FlightShowRequest = pb.FlightShowRequest;
export type FlightShowRequest = Types.FlightShowRequest;
