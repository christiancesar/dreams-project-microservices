import { Prisma } from "@prisma/client";

export type Flight = {
  id: string;
  itineraries: Prisma.JsonValue;
  price: Prisma.JsonValue;
  userId: string;
  isPackage: boolean;
  createdAt: Date;
  updatedAt: Date;
}