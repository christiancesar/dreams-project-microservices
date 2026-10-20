import { z } from "zod";

// Espelha src/@types/amadeus. Campos seguem o retorno da API Amadeus.

const FlightArrival = z.object({
  iataCode: z.string(),
  at: z.string(),
});

const FlightSegment = z.object({
  departure: FlightArrival,
  arrival: FlightArrival,
  carrierCode: z.string(),
  number: z.string(),
  aircraft: z.object({ code: z.string() }),
  operating: z.object({ carrierCode: z.string() }),
  duration: z.string(),
  id: z.string(),
  numberOfStops: z.number(),
  blacklistedInEU: z.boolean(),
});

const FlightPrice = z.object({
  currency: z.string(),
  total: z.string(),
  base: z.string(),
  fees: z.array(z.object({ amount: z.string(), type: z.string() })),
  grandTotal: z.string(),
});

const FlightTravelerPricing = z.object({
  travelerId: z.string(),
  fareOption: z.string(),
  travelerType: z.string(),
  price: z.object({ currency: z.string(), total: z.string(), base: z.string() }),
  fareDetailsBySegment: z.array(z.object({
    segmentId: z.string(),
    cabin: z.string(),
    fareBasis: z.string(),
    brandedFare: z.string(),
    class: z.string(),
    includedCheckedBags: z.object({ quantity: z.number() }).optional(),
  })),
  associatedAdultId: z.string().optional(),
});

export const FlightOfferSchema = z.object({
  type: z.string(),
  id: z.string(),
  source: z.string(),
  instantTicketingRequired: z.boolean(),
  nonHomogeneous: z.boolean(),
  oneWay: z.boolean(),
  lastTicketingDate: z.string(),
  numberOfBookableSeats: z.number(),
  itineraries: z.array(z.object({
    duration: z.string(),
    segments: z.array(FlightSegment),
  })),
  price: FlightPrice,
  pricingOptions: z.object({
    fareType: z.array(z.string()),
    includedCheckedBagsOnly: z.boolean(),
  }),
  validatingAirlineCodes: z.array(z.string()),
  travelerPricings: z.array(FlightTravelerPricing),
}).describe("Oferta de voo (Amadeus Flight Offers Search)");

const HotelAddress = z.object({
  lines: z.array(z.string()),
  postalCode: z.string(),
  cityName: z.string(),
  countryCode: z.string(),
  stateCode: z.string(),
});

const HotelOfferPrice = z.object({
  currency: z.string(),
  base: z.string(),
  total: z.string(),
  taxes: z.array(z.object({
    code: z.string(),
    amount: z.string(),
    currency: z.string(),
    included: z.boolean(),
  })),
});

const HotelOfferItem = z.object({
  id: z.string(),
  checkInDate: z.string(),
  checkOutDate: z.string(),
  rateCode: z.string(),
  commission: z.object({ percentage: z.string() }),
  room: z.object({
    type: z.string(),
    typeEstimated: z.object({
      category: z.string(),
      beds: z.number(),
      bedType: z.string(),
    }),
    description: z.object({ lang: z.string(), text: z.string() }),
  }),
  guests: z.object({ adults: z.number() }),
  price: HotelOfferPrice,
  policies: z.object({
    paymentType: z.string(),
    cancellation: z.object({ deadline: z.string() }),
  }),
  self: z.string(),
});

export const HotelOfferSchema = z.object({
  type: z.string(),
  hotel: z.object({
    type: z.string(),
    hotelId: z.string(),
    chainCode: z.string(),
    dupeId: z.string(),
    name: z.string(),
    rating: z.string(),
    cityCode: z.string(),
    latitude: z.number(),
    longitude: z.number(),
    hotelDistance: z.object({ distance: z.number(), distanceUnit: z.string() }),
    address: HotelAddress,
    contact: z.object({ phone: z.string(), fax: z.string(), email: z.string() }),
    description: z.object({ lang: z.string(), text: z.string() }),
  }),
  available: z.boolean(),
  offers: z.array(HotelOfferItem),
  self: z.string(),
}).describe("Oferta de hotel (Amadeus Hotel Offers Search)");
