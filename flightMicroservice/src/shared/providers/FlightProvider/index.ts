import { container } from 'tsyringe';
import { FlightAmadeusProvider } from './implementations/FlightAmadeusProvider.js';
import { FlightFakeProvider } from './implementations/FlightFakeProvider.js';
import { IFlightProvider } from './interfaces/IFlightProvider.js';

// AMADEUS_MODE=real usa o dreams-amadeus contra a API; qualquer outro valor usa o fake.
const implementation = process.env.AMADEUS_MODE === 'real' ? FlightAmadeusProvider : FlightFakeProvider;

container.registerSingleton<IFlightProvider>(
  'FlightProvider',
  implementation
)
