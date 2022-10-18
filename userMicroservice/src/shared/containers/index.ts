import { container } from 'tsyringe';
import { UsersRepository } from '../../modules/repositories/implementations/UsersRepository';
import { IUsersRepository } from '../../modules/repositories/interfaces/IUsersRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);