// Wrapper ESM sobre dreams-proto-sharing/src/contracts/user/user_grpc_pb.js, que é CJS com exports dinâmicos.
import pb from 'dreams-proto-sharing/src/contracts/user/user_grpc_pb.js';
import type * as Types from 'dreams-proto-sharing/src/contracts/user/user_grpc_pb.js';

export type IUsersClient = Types.IUsersClient;
export type IUsersServer = Types.IUsersServer;
export const UsersClient = pb.UsersClient;
export type UsersClient = Types.UsersClient;
export const UsersService = pb.UsersService;
