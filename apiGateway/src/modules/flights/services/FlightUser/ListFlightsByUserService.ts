import { Flight } from "@prisma/client";
import { Empty } from "google-protobuf/google/protobuf/empty_pb";
import { FlightByUserRequest, FlightListResponse } from "dreams-proto-sharing/src/contracts/flight/flight_pb";
import flightClient from "../../providers/FlightService";

type FlightRequest = {
  userId: string;
}

type FlightResponse = {
  id: string;
  itineraries: any;
  price: any;
  createdAt: Date;
  updatedAt: Date;
}


export default class ListFlightsByUserService {

  async execute({ userId }: FlightRequest): Promise<FlightResponse[]> {

    const listFlightbyUserServiceRequest = (user: FlightRequest) => new Promise<FlightListResponse>((resolve, reject) => {
      flightClient.listFlightbyUser(
        new FlightByUserRequest().setUserid(userId),
        (err, flight) => {
          if (err) {
            reject(err)
          }
          resolve(flight)
        }
      );
    });

    const flightsResponse = await listFlightbyUserServiceRequest({ userId });

    const flights: FlightResponse[] = [];

    flightsResponse.getFlightList().map(flight => {
      flights.push({
        id: flight.getId(),
        itineraries: JSON.parse(flight.getItineraries()),
        price: JSON.parse(flight.getPrice()),
        createdAt: new Date(flight.getCreatedat()),
        updatedAt: new Date(flight.getUpdateat())
      });
    })


    return flights
  }
}