export type UpdateHotelStatusDTO = {
  hotelId: string;
  eventName: string;
  errorDescription: string;
  active: boolean;
  status: string;
}