import { z } from "zod";

export const AnyResponse = z.any().describe("Dados retornados pelo serviço");

export const ErrorResponse = z.object({
  status: z.literal("error").optional(),
  code: z.string().optional(),
  message: z.string(),
}).describe("Erro retornado pelo gateway");

export const errorResponses = {
  400: ErrorResponse.describe("Requisição inválida"),
  500: ErrorResponse.describe("Erro interno"),
};

// Payload de oferta da Amadeus, repassado como JSON sem mapeamento no gateway.
export const AmadeusOffer = z.record(z.string(), z.any()).describe("Oferta no formato da API Amadeus");

// JSON livre salvo pelo serviço (itinerários, preço, dados de hotel).
export const JsonData = z.any();
