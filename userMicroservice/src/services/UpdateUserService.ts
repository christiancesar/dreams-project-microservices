import { status } from "@grpc/grpc-js";
import { inject, injectable } from "tsyringe";
import AppError from "../../errors/AppError";
import { UsersRepository } from "../repositories/implementations/UsersRepository";
import { User } from "../schemas/User";
import ObjectID from "bson-objectid";

type UpdateUserParams = {
  id: string,
  firstName: string,
  lastName: string,
  birthday: string,
  age: number,
  email: string
}


@injectable()
export class UpdateUserService {
  constructor(
    @inject('UsersRepository')
    private userRepository: UsersRepository
  ) { }


  async execute({
    id,
    firstName,
    lastName,
    birthday,
    age,
    email
  }: UpdateUserParams): Promise<User> {

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