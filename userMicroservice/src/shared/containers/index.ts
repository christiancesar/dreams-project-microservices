import { container } from 'tsyringe';
import { UsersRepository } from '../../modules/repositories/implementations/UsersRepository.js';
import { IUsersRepository } from '../../modules/repositories/interfaces/IUsersRepository.js';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);