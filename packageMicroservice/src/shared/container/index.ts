import { container } from 'tsyringe';
import PackageRepository from '../../repositories/implementations/PackageRepository';
import { IPackageRepository } from '../../repositories/interfaces/IPackageRepository';
import { FlightDreamsProvider } from './providers/FlightProvider/implementations/FlightDreamsProvider';
import { IFlightProvider } from './providers/FlightProvider/interfaces/IFlightProvider';
import { HotelDreamsProvider } from './providers/HotelProvider/implementations/HotelDreamsProvider';
import { IHotelProvider } from './providers/HotelProvider/interface/IHotelProvider';

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