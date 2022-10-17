import { status } from "@grpc/grpc-js";
import ObjectID from "bson-objectid";
import { inject, injectable } from "tsyringe";
import AppError from "../../errors/AppError";
import { UpdateUserRequestDTO } from "../dtos/UpdateUserRequestDTO";
import { IUsersRepository } from "../repositories/interfaces/IUsersRepository";
import { User } from "../schemas/User";

@injectable()
export class UpdateUserService {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUsersRepository
  ) { }

  async execute({
    id,
    firstName,
    lastName,
    birthday,
    age,
    email
  }: UpdateUserRequestDTO): Promise<User> {

    if (!ObjectID.isValid(id)) throw new AppError({ code: status.INVALID_ARGUMENT, name: 'Show User', message: 'Sorry, but property id is not valid.' });

    const userAlreadyExist = await this.userRepository.findByUserId(id)

    if (!userAlreadyExist) {
      throw new AppError({ code: status.INVALID_ARGUMENT, name: 'Show User', message: 'Sorry, but user not exist.' });
    }

    if (age <= 17) throw new AppError({ code: status.INVALID_ARGUMENT, name: 'Create User', message: 'You must be over 18 years old.' });


    const user = this.userRepository.updateUser({
      id,
      firstName,
      lastName,
      birthday,
      age,
      email
    })

    return user
  }
}