import { z } from "zod";
import { AmadeusOffer, JsonData } from "./common";

export const HotelIdParams = z.object({
  hotelId: z.string().describe("Id do hotel registrado"),
});
export type HotelIdParams = z.infer<typeof HotelIdParams>;

export const HotelUserParams = z.object({
  userId: z.string().describe("Id do usuário"),
});
export type HotelUserParams = z.infer<typeof HotelUserParams>;

export const CreateHotelBody = z.object({
  userId: z.string().describe("Id do usuário dono do hotel"),
  hotel: z.any().describe("Dados do hotel, como retornados pela busca"),
  offers: z.any().describe("Ofertas do hotel, como retornadas pela busca"),
});
export type CreateHotelBody = z.infer<typeof CreateHotelBody>;

export const HotelOffersQuery = z.object({
  cityCode: z.string().length(3).describe("Código IATA da cidade"),
  checkInDate: z.string().describe("Data de check-in (AAAA-MM-DD)"),
  checkOutDate: z.string().describe("Data de check-out (AAAA-MM-DD)"),
  adults: z.coerce.number().int().min(1).describe("Número de adultos"),
  roomQuantity: z.coerce.number().int().min(1).describe("Número de quartos"),
});
export type HotelOffersQuery = z.infer<typeof HotelOffersQuery>;

export const HotelResponse = z.object({
  id: z.string(),
  hotel: JsonData.describe("Dados do hotel"),
  offers: JsonData.describe("Ofertas do hotel"),
  createAt: z.date(),
  updateAt: z.date(),
}).describe("Hotel registrado");
export type HotelResponse = z.infer<typeof HotelResponse>;

export const HotelOfferResponse = AmadeusOffer;
