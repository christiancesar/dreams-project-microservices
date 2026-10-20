import { container } from 'tsyringe';
import { HotelsRepository } from '../../modules/repositories/implementations/HotelsRepository.js';
import { IHotelsRepository } from '../../modules/repositories/interfaces/IHotelsRepository.js';

container.registerSingleton<IHotelsRepository>(
  'HotelsRepository',
  HotelsRepository,
);