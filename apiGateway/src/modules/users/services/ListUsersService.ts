import { Empty } from 'google-protobuf/google/protobuf/empty_pb';
import { User, UserResponse } from "dreams-proto-sharing/src/contracts/user/user_pb";
import { IUserDTO } from '../dtos/IUserDTO';

import userClient from "../providers/UserService";
import AppError from "../../../errors/AppError";
import { ServiceError } from "@grpc/grpc-js";

export class ListUsersService {

  async execute(): Promise<IUserDTO[]> {
    let users = [] as IUserDTO[];

    const userServiceRequest = () => new Promise<UserResponse>((resolve, reject) => {
      userClient.listUsers(
        new Empty(), (err, users) => {
          if (err) {
            reject(err)
          }

          resolve(users)
        }
      )
    })

    await userServiceRequest().then((userResponse: UserResponse) => {
      userResponse.getUserList().map((user: User) => {
        users.push({
          id: user.toObject().id,
          firstname: user.toObject().firstname,
          lastname: user.toObject().lastname,
          age: user.toObject().age,
          birthday: user.toObject().birthday,
          email: user.toObject().email,
        })
      })

    }).catch((error: ServiceError) => {
      throw new AppError(error.message)
    })


    return users

  }
}