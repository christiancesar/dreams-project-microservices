import { faker } from "@faker-js/faker";
import { injectable } from "tsyringe";
import { FlightOfferSearchResponse } from "../../../../@types/amadeus/flights/FlightOfferSearchResponse";
import { FlightOfferSearchDTO } from "../dtos/FlightOffersSearchDTO";
import { createFlightOffer } from "../factories/flightOffer.factory";
import { IFlightProvider } from "../interfaces/IFlightProvider";

// Provider de desenvolvimento e testes: devolve ofertas geradas pelo faker,
// sem chamar nenhuma API externa. Defina FAKER_SEED para resultados repetíveis.
@injectable()
export class FlightFakeProvider implements IFlightProvider {
  constructor() {
    if (process.env.FAKER_SEED) faker.seed(Number(process.env.FAKER_SEED));
  }

  async findFlights(params: FlightOfferSearchDTO): Promise<FlightOfferSearchResponse> {
    const count = faker.number.int({ min: 3, max: 8 });
    const data = faker.helpers.multiple(() => createFlightOffer(params), { count });
    return { data };
  }
}
