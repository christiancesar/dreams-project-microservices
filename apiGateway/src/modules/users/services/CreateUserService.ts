import { type ServiceError } from '@grpc/grpc-js';
import { User, UserRequest, UserResponse } from "../../../proto/user_pb.js";
import { type ICreateUser } from '../dtos/ICreateUserDTO.js';
import { type IUserDTO } from '../dtos/IUserDTO.js';
import AppError from '../../../errors/AppError.js';
import userClient from '../providers/UserService.js';

export class CreateUserService {

  async execute({
    firstName,
    lastName,
    birthday,
    age,
    email
  }: ICreateUser): Promise<IUserDTO[]> {

    let users = [] as IUserDTO[];

    const userServiceRequest = (userRequest: ICreateUser) => new Promise<UserResponse>((resolve, reject) => {
      userClient.createUser(
        new UserRequest().setUser(
          new User()
            .setFirstname(userRequest.firstName)
            .setLastname(userRequest.lastName)
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
      firstName,
      lastName,
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
    })
      .catch((error: ServiceError) => {
        throw new AppError(error.message)
      })

    return users;
  }
}