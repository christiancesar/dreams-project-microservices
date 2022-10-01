import { Empty } from "google-protobuf/google/protobuf/empty_pb";
import { FlightListResponse } from "dreams-proto-sharing/src/contracts/flight/flight_pb";
import flightClient from "../../providers/FlightService";


type FlightResponse = {
  id: string;
  itineraries: any;
  price: any;
  createdAt: Date;
  updatedAt: Date;
}


export default class ListFlightsService {

  async execute(): Promise<FlightResponse[]> {

    const listFlightServiceRequest = () => new Promise<FlightListResponse>((resolve, reject) => {
      flightClient.listFlights(
        new Empty(),
        (err, flight) => {
          if (err) {
            reject(err)
          }
          resolve(flight)
        }
      );
    });

    const flightsResponse = await listFlightServiceRequest();

    const flights = [] as FlightResponse[];

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