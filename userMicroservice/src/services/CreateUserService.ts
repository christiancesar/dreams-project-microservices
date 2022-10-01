import { status } from '@grpc/grpc-js/';
import { injectable, inject } from 'tsyringe';
import AppError from "../../errors/AppError";
import { UsersRepository } from "../repositories/implementations/UsersRepository";
import { User } from '../schemas/User';

type CreateUserParams = {
  firstName: string,
  lastName: string,
  birthday: string,
  age: number,
  email: string
}

@injectable()
export class CreateUserService {


  constructor(
    @inject('UsersRepository')
    private userRepository: UsersRepository
  ) { }

  async execute({
    firstName,
    lastName,
    birthday,
    age,
    email
  }: CreateUserParams): Promise<User> {


    if (age <= 17) throw new AppError({ code: status.INVALID_ARGUMENT, name: 'Create User', message: 'You must be over 18 years old.' });

    if ((lastName === '') || (firstName === '')) throw new AppError({ code: status.INVALID_ARGUMENT, name: 'Create User', message: 'First and Last not is empty' });

    const userAlreadyExist = await this.userRepository.findByEmail(email)

    if (userAlreadyExist) {
      throw new AppError({ code: status.INVALID_ARGUMENT, name: 'Create User', message: 'Already exist user with email.' });
    }

    const user = await this.userRepository.create({
      firstName,
      lastName,
      birthday,
      age,
      email
    })
    return user
  }
}