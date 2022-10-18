import { container } from 'tsyringe';
import { HotelAmadeusProvider } from './implementations/HotelAmadeusProvider';
import { IHotelProvider } from './interfaces/IHotelProvider';

container.registerSingleton<IHotelProvider>(
  'HotelProvider',
  HotelAmadeusProvider
)
