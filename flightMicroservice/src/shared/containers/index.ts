import { container } from 'tsyringe';
import { FlightsRepository } from '../../modules/repositories/implementations/FlightsRepository';
import { IFlightsRepository } from '../../modules/repositories/interfaces/IFlightsRepository';

container.registerSingleton<IFlightsRepository>(
  'FlightsRepository',
  FlightsRepository,
);