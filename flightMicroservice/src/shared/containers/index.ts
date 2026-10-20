import { container } from 'tsyringe';
import { FlightsRepository } from '../../modules/repositories/implementations/FlightsRepository.js';
import { IFlightsRepository } from '../../modules/repositories/interfaces/IFlightsRepository.js';

container.registerSingleton<IFlightsRepository>(
  'FlightsRepository',
  FlightsRepository,
);