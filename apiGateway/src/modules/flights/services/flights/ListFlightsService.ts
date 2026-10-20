import { Empty } from "../../../../proto/empty_pb.js";
import { FlightListResponse } from "../../../../proto/flight_pb.js";
import flightClient from "../../providers/FlightService.js";


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