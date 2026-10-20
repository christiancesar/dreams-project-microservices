import { z } from "zod";
import { JsonData } from "./common";
import { FlightOfferSchema, HotelOfferSchema } from "./amadeus";

export const PackageUserParams = z.object({
  userId: z.string().describe("Id do usuário"),
});
export type PackageUserParams = z.infer<typeof PackageUserParams>;

export const CreatePackageBody = z.object({
  userId: z.string().describe("Id do usuário"),
  flight: z.object({
    itineraries: z.any(),
    price: z.any(),
  }).describe("Dados do voo, como retornados pela busca"),
  hotel: z.object({
    hotel: z.any(),
    offers: z.any(),
  }).describe("Dados do hotel, como retornados pela busca"),
  amount: z.number().describe("Valor total do pacote"),
  off: z.number().describe("Desconto aplicado ao pacote"),
});
export type CreatePackageBody = z.infer<typeof CreatePackageBody>;

export const PackageOffersQuery = z.object({
  originLocationCode: z.string().length(3).describe("Código IATA de origem"),
  destinationLocationCode: z.string().length(3).describe("Código IATA de destino"),
  departureDate: z.string().describe("Data de ida (AAAA-MM-DD)"),
  returnDate: z.string().describe("Data de volta (AAAA-MM-DD)"),
  adults: z.coerce.number().int().min(1).describe("Número de adultos"),
  children: z.coerce.number().int().min(0).default(0).describe("Número de crianças"),
  infants: z.coerce.number().int().min(0).default(0).describe("Número de bebês"),
  travelClass: z.string().describe("Classe de viagem, ex.: ECONOMY"),
  roomQuantity: z.coerce.number().int().min(1).describe("Número de quartos"),
});
export type PackageOffersQuery = z.infer<typeof PackageOffersQuery>;

export const PackageResponse = z.object({
  id: z.string(),
  flight: z.object({
    itineraries: JsonData,
    price: JsonData,
  }),
  hotel: z.object({
    hotel: JsonData,
    offers: JsonData,
  }),
  amount: z.number(),
  off: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
}).describe("Pacote registrado");
export type PackageResponse = z.infer<typeof PackageResponse>;

export const PackageOfferResponse = z.object({
  flight: FlightOfferSchema.describe("Oferta de voo (Amadeus)"),
  hotel: HotelOfferSchema.describe("Oferta de hotel (Amadeus)"),
  off: z.number().describe("Desconto aplicado"),
  total: z.number().describe("Valor total do pacote"),
}).describe("Oferta de pacote montada a partir de voo e hotel");
