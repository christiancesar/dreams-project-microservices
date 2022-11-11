export type UpdateFlightStatusDTO = {
  flightId: string;
  eventName: string;
  errorDescription: string;
  active: boolean;
  status: string;
}