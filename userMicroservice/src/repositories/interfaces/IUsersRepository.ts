import { CreateUserRequestDTO } from "../../dtos/CreateUserRequestDTO"
import { UpdateUserRequestDTO } from "../../dtos/UpdateUserRequestDTO"
import { User } from "../../entities/UserEntity"

export interface IUsersRepository {
  create(data: CreateUserRequestDTO): Promise<User>
  findByEmail(email: string): Promise<User | null>
  findByUserId(userId: string): Promise<User | null>
  findAll(): Promise<User[]>
  updateUser(user: UpdateUserRequestDTO): Promise<User>
  deleteUser(userId: string): Promise<User>
}