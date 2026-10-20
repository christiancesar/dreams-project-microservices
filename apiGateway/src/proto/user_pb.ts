// Wrapper ESM sobre dreams-proto-sharing/src/contracts/user/user_pb.js, que é CJS com exports dinâmicos.
import pb from 'dreams-proto-sharing/src/contracts/user/user_pb.js';
import type * as Types from 'dreams-proto-sharing/src/contracts/user/user_pb.js';

export const User = pb.User;
export type User = Types.User;
export const UserRequest = pb.UserRequest;
export type UserRequest = Types.UserRequest;
export const UserResponse = pb.UserResponse;
export type UserResponse = Types.UserResponse;
