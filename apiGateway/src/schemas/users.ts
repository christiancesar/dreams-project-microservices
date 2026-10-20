import { z } from "zod";

export const UserIdParams = z.object({
  userId: z.string().describe("Id do usuário"),
});
export type UserIdParams = z.infer<typeof UserIdParams>;

export const CreateUserBody = z.object({
  firstName: z.string(),
  lastName: z.string(),
  birthday: z.string().describe("Data de nascimento (AAAA-MM-DD)"),
  age: z.number().int().min(0),
  email: z.email(),
});
export type CreateUserBody = z.infer<typeof CreateUserBody>;

export const UpdateUserBody = z.object({
  id: z.string().describe("Id do usuário a atualizar"),
  firstname: z.string(),
  lastname: z.string(),
  birthday: z.string().describe("Data de nascimento (AAAA-MM-DD)"),
  age: z.number().int().min(0),
  email: z.email(),
});
export type UpdateUserBody = z.infer<typeof UpdateUserBody>;

export const UserResponse = z.object({
  id: z.string(),
  firstname: z.string(),
  lastname: z.string(),
  age: z.number(),
  birthday: z.string(),
  email: z.string(),
}).describe("Usuário");
export type UserResponse = z.infer<typeof UserResponse>;
