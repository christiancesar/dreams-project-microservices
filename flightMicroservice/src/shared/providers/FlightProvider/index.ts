import { container } from 'tsyringe';
import { FlightAmadeusProvider } from './implementations/FlightAmadeusProvider';
import { IFlightProvider } from './interfaces/IFlightProvider';

container.registerSingleton<IFlightProvider>(
  'FlightProvider',
  FlightAmadeusProvider
)
