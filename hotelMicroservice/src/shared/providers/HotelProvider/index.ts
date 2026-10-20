import { container } from 'tsyringe';
import { HotelAmadeusProvider } from './implementations/HotelAmadeusProvider';
import { HotelFakeProvider } from './implementations/HotelFakeProvider';
import { IHotelProvider } from './interfaces/IHotelProvider';

// AMADEUS_MODE=real usa o dreams-amadeus contra a API; qualquer outro valor usa o fake.
const implementation = process.env.AMADEUS_MODE === 'real' ? HotelAmadeusProvider : HotelFakeProvider;

container.registerSingleton<IHotelProvider>(
  'HotelProvider',
  implementation
)
