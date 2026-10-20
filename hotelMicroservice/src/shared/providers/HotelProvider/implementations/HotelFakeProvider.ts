import { faker } from "@faker-js/faker";
import { injectable } from "tsyringe";
import { HotelOfferSearchResponse } from "../../../../@types/amadeus/hotels/HotelOfferSearchResponse.js";
import { HotelOffersSearchDTO } from "../dtos/HotelOffersSearchDTO.js";
import { createHotelOffer } from "../factories/hotelOffer.factory.js";
import { IHotelProvider } from "../interfaces/IHotelProvider.js";

// Provider de desenvolvimento e testes: gera hotéis com o faker, sem API externa.
// Defina FAKER_SEED para resultados repetíveis.
@injectable()
export class HotelFakeProvider implements IHotelProvider {
  constructor() {
    if (process.env.FAKER_SEED) faker.seed(Number(process.env.FAKER_SEED));
  }

  async findHotels(params: HotelOffersSearchDTO): Promise<HotelOfferSearchResponse> {
    const count = faker.number.int({ min: 3, max: 8 });
    const data = faker.helpers.multiple(() => createHotelOffer(params), { count });
    return { data };
  }
}
