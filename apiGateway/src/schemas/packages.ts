import { z } from "zod";

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
