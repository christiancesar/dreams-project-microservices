import { ServiceError } from "@grpc/grpc-js";
import { User, UserRequest, UserResponse } from "dreams-proto-sharing/src/contracts/user/user_pb";
import AppError from "../../../errors/AppError";
import { IUserDTO } from "../dtos/IUserDTO";
import userClient from "../providers/UserService";

export class UpdateUserService {

  async execute({
    id,
    firstname,
    lastname,
    birthday,
    age,
    email
  }: IUserDTO): Promise<IUserDTO[]> {

    let users = [] as IUserDTO[];

    const userServiceRequest = (userRequest: IUserDTO) => new Promise<UserResponse>((resolve, reject) => {
      userClient.updateUser(
        new UserRequest().setUser(
          new User()
            .setId(userRequest.id)
            .setFirstname(userRequest.firstname)
            .setLastname(userRequest.lastname)
            .setAge(userRequest.age)
            .setEmail(userRequest.email)
            .setBirthday(userRequest.birthday)
        ), (err, users) => {
          if (err) {
            reject(err)
          }
          resolve(users)
        }
      )
    })

    await userServiceRequest({
      id,
      firstname,
      lastname,
      birthday,
      age,
      email
    }).then((userResponse: UserResponse) => {
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

    return users;
  }
}