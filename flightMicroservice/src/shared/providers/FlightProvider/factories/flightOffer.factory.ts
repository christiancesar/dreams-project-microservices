import { faker } from "@faker-js/faker";
import {
  BrandedFare,
  Cabin,
  Class,
  Currency,
  FareBasis,
  FareOption,
  TravelerType,
  type FlightOffer,
  type Itinerary,
  type Segment,
  type TravelerPricing,
} from "../../../../@types/amadeus/flights/FlightOfferSearchResponse.js";
import { FlightOfferSearchDTO } from "../dtos/FlightOffersSearchDTO.js";

// Companhias usadas nos trechos simulados.
const CARRIERS = ["LA", "G3", "AD", "JJ", "AZ"] as const;

function isoDuration(totalMinutes: number): string {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `PT${hours}H${minutes}M`;
}

// Monta um trecho com horário de partida e chegada coerentes com a duração.
function createSegment(origin: string, destination: string, date: string): Segment {
  const carrier = faker.helpers.arrayElement(CARRIERS);
  const departure = faker.date.between({ from: `${date}T06:00:00`, to: `${date}T21:00:00` });
  const durationMinutes = faker.number.int({ min: 60, max: 240 });
  const arrival = new Date(departure.getTime() + durationMinutes * 60_000);

  return {
    departure: { iataCode: origin, at: departure.toISOString().slice(0, 19) },
    arrival: { iataCode: destination, at: arrival.toISOString().slice(0, 19) },
    carrierCode: carrier,
    number: String(faker.number.int({ min: 1000, max: 9999 })),
    aircraft: { code: faker.helpers.arrayElement(["320", "737", "E95", "E90"]) },
    operating: { carrierCode: carrier },
    duration: isoDuration(durationMinutes),
    id: faker.string.numeric(3),
    numberOfStops: 0,
    blacklistedInEU: false,
  };
}

function createItinerary(origin: string, destination: string, date: string): Itinerary {
  const segment = createSegment(origin, destination, date);
  return { duration: segment.duration, segments: [segment] };
}

function createTravelerPricings(params: FlightOfferSearchDTO, perTraveler: number): TravelerPricing[] {
  const travelers: TravelerPricing[] = [];
  const types: Array<[TravelerType, number]> = [
    [TravelerType.Adult, params.adults],
    [TravelerType.Child, params.children ?? 0],
    [TravelerType.HeldInfant, params.infants ?? 0],
  ];

  let travelerId = 1;
  for (const [type, count] of types) {
    for (let i = 0; i < count; i++) {
      const total = (perTraveler * (type === TravelerType.HeldInfant ? 0.1 : type === TravelerType.Child ? 0.75 : 1)).toFixed(2);
      travelers.push({
        travelerId: String(travelerId++),
        fareOption: FareOption.Standard,
        travelerType: type,
        price: { currency: Currency.Brl, total, base: total },
        fareDetailsBySegment: [
          {
            segmentId: "1",
            cabin: Cabin.Economy,
            fareBasis: FareBasis.Feebfz4L,
            brandedFare: BrandedFare.Azul,
            class: Class.F,
            includedCheckedBags: { quantity: 1 },
          },
        ],
      });
    }
  }
  return travelers;
}

// Gera uma oferta de voo coerente com a requisição: rota, datas e passageiros.
// Ida e volta só existem quando `returnDate` é informado.
export function createFlightOffer(params: FlightOfferSearchDTO): FlightOffer {
  const origin = params.originLocationCode;
  const destination = params.destinationLocationCode;
  const itineraries: Itinerary[] = [createItinerary(origin, destination, params.departureDate)];
  if (params.returnDate) {
    itineraries.push(createItinerary(destination, origin, params.returnDate));
  }

  const travelers = params.adults + (params.children ?? 0) + (params.infants ?? 0);
  const perTraveler = faker.number.float({ min: 350, max: 1800, fractionDigits: 2 });
  const total = (perTraveler * travelers).toFixed(2);

  return {
    type: "flight-offer",
    id: faker.string.numeric(3),
    source: "GDS",
    instantTicketingRequired: false,
    nonHomogeneous: false,
    oneWay: !params.returnDate,
    lastTicketingDate: params.departureDate,
    numberOfBookableSeats: faker.number.int({ min: 1, max: 9 }),
    itineraries,
    price: {
      currency: Currency.Brl,
      total,
      base: (perTraveler * travelers * 0.9).toFixed(2),
      fees: [{ amount: "0.00", type: "SUPPLIER" }],
      grandTotal: total,
    },
    pricingOptions: { fareType: ["PUBLISHED"], includedCheckedBagsOnly: false },
    validatingAirlineCodes: [faker.helpers.arrayElement(CARRIERS)],
    travelerPricings: createTravelerPricings(params, perTraveler),
  };
}

