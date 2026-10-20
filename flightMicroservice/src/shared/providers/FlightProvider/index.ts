import { container } from 'tsyringe';
import { FlightAmadeusProvider } from './implementations/FlightAmadeusProvider';
import { FlightFakeProvider } from './implementations/FlightFakeProvider';
import { IFlightProvider } from './interfaces/IFlightProvider';

// AMADEUS_MODE=real usa o dreams-amadeus contra a API; qualquer outro valor usa o fake.
const implementation = process.env.AMADEUS_MODE === 'real' ? FlightAmadeusProvider : FlightFakeProvider;

container.registerSingleton<IFlightProvider>(
  'FlightProvider',
  implementation
)
