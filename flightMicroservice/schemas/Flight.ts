import { Prisma } from "@prisma/client";

type Flight = {
  id: string;
  itineraries: Prisma.JsonValue;
  price: Prisma.JsonValue;
  userId: string;
  isPackage: boolean;
  createdAt: Date;
  updatedAt: Date;
}