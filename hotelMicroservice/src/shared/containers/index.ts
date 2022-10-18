import { container } from 'tsyringe';
import { HotelsRepository } from '../../modules/repositories/implementations/HotelsRepository';
import { IHotelsRepository } from '../../modules/repositories/interfaces/IHotelsRepository';

container.registerSingleton<IHotelsRepository>(
  'HotelsRepository',
  HotelsRepository,
);