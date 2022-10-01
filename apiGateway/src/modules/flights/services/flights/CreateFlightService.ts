import { FlightCreate, FlightCreateRequest, FlightResponse as FlightCreateResponse } from "dreams-proto-sharing/src/contracts/flight/flight_pb";
import flightClient from "../../providers/FlightService";

type FlightRequest = {
  itineraries: any;
  price: any;
  userId: string;
}

type FlightResponse = {
  id: string;
  itineraries: any;
  price: any;
  createdAt: Date;
  updatedAt: Date;
}

export default class CreateFlightService {

  async execute({ itineraries, price, userId }: FlightRequest): Promise<FlightResponse> {

    const createFlightServiceRequest = (search: FlightRequest) => new Promise<FlightCreateResponse>((resolve, reject) => {
      flightClient.createFlight(
        new FlightCreateRequest().setFlightcreate(
          new FlightCreate()
            .setItineraries(JSON.stringify(search.itineraries))
            .setPrice(JSON.stringify(search.price))
            .setUserid(search.userId)
        ),
        (err, flight) => {
          if (err) {
            reject(err)
          }
          resolve(flight)
        }
      );
    });

    const flightResponse = await createFlightServiceRequest({ itineraries, price, userId })

    const flight = flightResponse.getFlight()!.toObject()!

    return {
      id: flight?.id,
      itineraries: JSON.parse(flight.itineraries),
      price: JSON.parse(flight.price),
      createdAt: new Date(flight.createdat),
      updatedAt: new Date(flight.updateat)
    }
  }
}