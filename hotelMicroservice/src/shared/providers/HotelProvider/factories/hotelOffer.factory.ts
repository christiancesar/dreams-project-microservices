import { faker } from "@faker-js/faker";
import type { Hotel, HotelOffer, Offer } from "../../../../@types/amadeus/hotels/HotelOfferSearchResponse";
import { HotelOffersSearchDTO } from "../dtos/HotelOffersSearchDTO";

const ROOM_TYPES = ["SGL", "DBL", "TWN", "QUAD"] as const;
const BED_TYPES = ["KING", "QUEEN", "TWIN", "SINGLE"] as const;
const CATEGORIES = ["STANDARD_ROOM", "SUPERIOR_ROOM", "SUITE", "DELUXE_ROOM"] as const;

function createHotel(cityCode: string): Hotel {
  const city = faker.location.city();
  return {
    type: "hotel",
    hotelId: `${cityCode}${faker.string.alphanumeric({ length: 4, casing: "upper" })}`,
    chainCode: faker.string.alpha({ length: 2, casing: "upper" }),
    dupeId: faker.string.numeric(8),
    name: `${faker.company.name()} Hotel`,
    rating: String(faker.number.int({ min: 2, max: 5 })),
    cityCode,
    latitude: Number(faker.location.latitude({ min: -33, max: 5 })),
    longitude: Number(faker.location.longitude({ min: -74, max: -35 })),
    hotelDistance: { distance: faker.number.int({ min: 1, max: 30 }), distanceUnit: "KM" },
    address: {
      lines: [faker.location.streetAddress()],
      postalCode: faker.location.zipCode("#####-###"),
      cityName: city,
      countryCode: "BR",
      stateCode: faker.location.state({ abbreviated: true }),
    },
    contact: { phone: faker.phone.number(), fax: "", email: faker.internet.email() },
    description: { lang: "EN", text: faker.lorem.sentence() },
  };
}

// Uma oferta por quarto, com datas e número de hóspedes vindos da requisição.
function createOffer(params: HotelOffersSearchDTO): Offer {
  const nights = Math.max(1, Math.round((Date.parse(params.checkOutDate) - Date.parse(params.checkInDate)) / 86_400_000));
  const perNight = faker.number.float({ min: 180, max: 1200, fractionDigits: 2 });
  const base = (perNight * nights * params.roomQuantity).toFixed(2);
  const total = (Number(base) * 1.1).toFixed(2);

  return {
    id: faker.string.alphanumeric({ length: 10, casing: "upper" }),
    checkInDate: params.checkInDate,
    checkOutDate: params.checkOutDate,
    rateCode: faker.string.numeric(3),
    commission: { percentage: String(faker.number.int({ min: 5, max: 15 })) },
    room: {
      type: faker.helpers.arrayElement(ROOM_TYPES),
      typeEstimated: {
        category: faker.helpers.arrayElement(CATEGORIES),
        beds: faker.number.int({ min: 1, max: 2 }),
        bedType: faker.helpers.arrayElement(BED_TYPES),
      },
      description: { lang: "EN", text: faker.lorem.sentence() },
    },
    guests: { adults: params.adults },
    price: {
      currency: "BRL",
      base,
      total,
      taxes: [{ code: "TOTAL_TAX", amount: (Number(total) - Number(base)).toFixed(2), currency: "BRL", included: true }],
    },
    policies: {
      paymentType: "guarantee",
      cancellation: { deadline: `${params.checkInDate}T23:59:00` },
    },
    self: `https://example.invalid/offers/${faker.string.alphanumeric(10)}`,
  };
}

// Gera uma oferta de hotel coerente com a requisição: cidade, datas e hóspedes.
export function createHotelOffer(params: HotelOffersSearchDTO): HotelOffer {
  const offersCount = faker.number.int({ min: 1, max: 3 });
  return {
    type: "hotel-offers",
    hotel: createHotel(params.cityCode),
    available: true,
    offers: faker.helpers.multiple(() => createOffer(params), { count: offersCount }),
    self: `https://example.invalid/hotels/${faker.string.alphanumeric(8)}`,
  };
}
