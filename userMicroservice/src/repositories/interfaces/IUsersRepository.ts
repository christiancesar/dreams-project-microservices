import { ICreateUserDTO } from "../../dtos/ICreateUserDTO"
import { IUpdateUserDTO } from "../../dtos/IUpdateUserDTO"
import { User } from "../../schemas/User"

export interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<User>
  findByEmail(email: string): Promise<User | null>
  findByUserId(userId: string): Promise<User | null>
  findAll(): Promise<User[]>
  updateUser(user: IUpdateUserDTO): Promise<User>
  deleteUser(userId: string): Promise<User>
}