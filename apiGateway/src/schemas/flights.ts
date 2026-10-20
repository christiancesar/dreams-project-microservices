import { z } from "zod";

export const FlightIdParams = z.object({
  flightId: z.string().describe("Id do voo registrado"),
});
export type FlightIdParams = z.infer<typeof FlightIdParams>;

export const FlightUserParams = z.object({
  userId: z.string().describe("Id do usuário"),
});
export type FlightUserParams = z.infer<typeof FlightUserParams>;

export const CreateFlightBody = z.object({
  itineraries: z.any().describe("Itinerários do voo, como retornados pela busca"),
  price: z.any().describe("Preço do voo, como retornado pela busca"),
  userId: z.string().describe("Id do usuário dono do voo"),
});
export type CreateFlightBody = z.infer<typeof CreateFlightBody>;

export const FlightOffersQuery = z.object({
  originLocationCode: z.string().length(3).describe("Código IATA de origem"),
  destinationLocationCode: z.string().length(3).describe("Código IATA de destino"),
  departureDate: z.string().describe("Data de ida (AAAA-MM-DD)"),
  returnDate: z.string().optional().describe("Data de volta (AAAA-MM-DD)"),
  adults: z.coerce.number().int().min(1).describe("Número de adultos"),
  children: z.coerce.number().int().min(0).optional().describe("Número de crianças"),
  infants: z.coerce.number().int().min(0).optional().describe("Número de bebês"),
  travelClass: z.string().describe("Classe de viagem, ex.: ECONOMY"),
});
export type FlightOffersQuery = z.infer<typeof FlightOffersQuery>;
