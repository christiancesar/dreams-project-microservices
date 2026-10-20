// Wrapper ESM sobre dreams-proto-sharing/src/contracts/hotel/hotel_pb.js, que é CJS com exports dinâmicos.
import pb from 'dreams-proto-sharing/src/contracts/hotel/hotel_pb.js';
import type * as Types from 'dreams-proto-sharing/src/contracts/hotel/hotel_pb.js';

export const Hotel = pb.Hotel;
export type Hotel = Types.Hotel;
export const HotelCreate = pb.HotelCreate;
export type HotelCreate = Types.HotelCreate;
export const HotelCreateRequest = pb.HotelCreateRequest;
export type HotelCreateRequest = Types.HotelCreateRequest;
export const HotelListResponse = pb.HotelListResponse;
export type HotelListResponse = Types.HotelListResponse;
export const HotelOffersRequest = pb.HotelOffersRequest;
export type HotelOffersRequest = Types.HotelOffersRequest;
export const HotelOffersResponse = pb.HotelOffersResponse;
export type HotelOffersResponse = Types.HotelOffersResponse;
export const HotelOffersSearch = pb.HotelOffersSearch;
export type HotelOffersSearch = Types.HotelOffersSearch;
export const HotelResponse = pb.HotelResponse;
export type HotelResponse = Types.HotelResponse;
export const HotelShowRequest = pb.HotelShowRequest;
export type HotelShowRequest = Types.HotelShowRequest;
export const HotelsByUserRequest = pb.HotelsByUserRequest;
export type HotelsByUserRequest = Types.HotelsByUserRequest;
