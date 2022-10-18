import { status } from '@grpc/grpc-js/';
import { inject, injectable } from 'tsyringe';
import { CreateUserRequestDTO } from '../dtos/CreateUserRequestDTO';
import { IUsersRepository } from '../repositories/interfaces/IUsersRepository';
import { User } from '../entities/UserEntity';
import { AppError } from '../../shared/errors/AppError';

@injectable()
export class CreateUserService {


  constructor(
    @inject('UsersRepository')
    private userRepository: IUsersRepository
  ) { }

  async execute({
    firstName,
    lastName,
    birthday,
    age,
    email
  }: CreateUserRequestDTO): Promise<User> {


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