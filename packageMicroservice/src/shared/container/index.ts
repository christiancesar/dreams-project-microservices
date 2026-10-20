import { container } from 'tsyringe';
import PackageRepository from '../../repositories/implementations/PackageRepository.js';
import { IPackageRepository } from '../../repositories/interfaces/IPackageRepository.js';
import { FlightDreamsProvider } from './providers/FlightProvider/implementations/FlightDreamsProvider.js';
import { IFlightProvider } from './providers/FlightProvider/interfaces/IFlightProvider.js';
import { HotelDreamsProvider } from './providers/HotelProvider/implementations/HotelDreamsProvider.js';
import { IHotelProvider } from './providers/HotelProvider/interface/IHotelProvider.js';

container.registerSingleton<IPackageRepository>(
  'PackageRepository',
  PackageRepository,
);

container.registerSingleton<IFlightProvider>(
  'FlightProvider',
  FlightDreamsProvider,
);

container.registerSingleton<IHotelProvider>(
  'HotelProvider',
  HotelDreamsProvider,
);