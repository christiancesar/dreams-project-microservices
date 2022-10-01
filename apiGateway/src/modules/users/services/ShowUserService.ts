import { ServiceError } from "@grpc/grpc-js";
import AppError from "../../../errors/AppError";
import { User, UserRequest, UserResponse } from "dreams-proto-sharing/src/contracts/user/user_pb";
import userClient from "../providers/UserService";
import { IUserDTO } from "../dtos/IUserDTO";

interface IRequest {
  userId: string
}

export class ShowUserService {

  async execute({ userId }: IRequest): Promise<IUserDTO[]> {

    let users = [] as IUserDTO[];

    const userServiceRequest = () => new Promise<UserResponse>((resolve, reject) => {
      userClient.showUser(
        new UserRequest().setUser(
          new User().setId(userId)
        ), (err, users) => {
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
