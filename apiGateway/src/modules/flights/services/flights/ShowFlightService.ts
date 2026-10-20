import {
  FlightResponse as FlightShowResponse,
  FlightShowRequest
} from "../../../../proto/flight_pb.js";

import flightClient from "../../providers/FlightService.js";

type FlightRequest ={
  flightId: string
}

type FlightResponse ={
  id: string;
  itineraries: any;
  price: any;
  createdAt: Date;
  updatedAt: Date;
}

export default class CreateFlightService {

  async execute({ flightId }: FlightRequest): Promise<FlightResponse | null> {
    
    const showFlightServiceRequest = (flight: FlightRequest) => new Promise<FlightShowResponse>((resolve, reject) => {
      flightClient.showFlight(
        new FlightShowRequest().setId(flight.flightId),
        (err, flight) => {
          if (err) {
            reject(err)
          }
          resolve(flight)
        }
      );
    });

    const flightResponse = await showFlightServiceRequest({ flightId });
    const flight = flightResponse.getFlight()!.toObject();

    return {
      id: flight.id,
      itineraries: JSON.parse(flight.itineraries),
      price: JSON.parse(flight.price),
      createdAt: new Date(flight.createdat),
      updatedAt: new Date(flight.updateat)
    };
  }
}