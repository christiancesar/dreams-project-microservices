export interface HotelOfferSearchRequest {
  cityCode: string;
  latitude?: number;
  longitude?: number;
  checkInDate: string;
  checkOutDate: string;
  roomQuantity: number;
  adults: number;
  radius: number;
  radiusUnit: 'KM' | 'MILE';
  ratings?: number[];
  priceRange?: string;
  currency: string;
  view: 'NONE' | 'LIGHT' | 'FULL';
  paymentPolicy: 'NONE';
  includeClosed: boolean;
  bestRateOnly: boolean;
  sort: 'NONE' | 'DISTANTE' | 'PRICE',
  boardType?: 'ROOM_ONLY' | 'BREAKFAST' | 'HALF_BOARD' | 'FULL_BOARD' | 'ALL_INCLUSIVE'

}