import flightApi from "../container/providers/FlightApi.ts/index.js";
import hotelApi from "../container/providers/HotelApi.ts/index.js";

export type PackageEventParams = {
  hotelId?: string;
  flightId?: string;
  eventName: string;
  errorDescription: string;
}

export type FlightEventParams = {
  flightId: string;
  eventName: string;
  errorDescription: string;
}

export type HotelEventParams = {
  hotelId: string;
  eventName: string;
  errorDescription: string;
}

class PackageTripEventHandle {
  constructor() { }

  private async flightEvent({flightId, eventName, errorDescription }: FlightEventParams): Promise<void> {
    const data = {
      flightId,
      eventName,
      errorDescription,
    }
    flightApi.patch('/flights', data).catch(console.error)
  }

  private async hotelEvent({ hotelId, eventName, errorDescription }: HotelEventParams): Promise<void> {
    const data = {
      hotelId,
      eventName,
      errorDescription,
    }
    hotelApi.patch('/hotels', data).catch(console.error)
  }

  async event(params: PackageEventParams): Promise<void> {
    switch (params.eventName) {
      case 'CREATE_HOTEL_ERROR':
        this.flightEvent(({
          flightId: params.flightId,
          errorDescription: params.errorDescription,
          eventName: params.eventName
        } as FlightEventParams));
        break;
      case 'CREATE_PACKAGE_ERROR':
        this.hotelEvent(({
          hotelId: params.hotelId,
          errorDescription: params.errorDescription,
          eventName: params.eventName
        } as HotelEventParams));

        this.flightEvent(({
          flightId: params.flightId,
          errorDescription: params.errorDescription,
          eventName: params.eventName
        } as FlightEventParams));
        break;
      default:
        break;
    }
  }
}

export default new PackageTripEventHandle();