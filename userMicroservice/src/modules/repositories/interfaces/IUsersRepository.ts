import { CreateUserRequestDTO } from "../../dtos/CreateUserRequestDTO.js"
import { UpdateUserRequestDTO } from "../../dtos/UpdateUserRequestDTO.js"
import { User } from "../../entities/UserEntity.js"

export interface IUsersRepository {
  create(data: CreateUserRequestDTO): Promise<User>
  findByEmail(email: string): Promise<User | null>
  findByUserId(userId: string): Promise<User | null>
  findAll(): Promise<User[]>
  updateUser(user: UpdateUserRequestDTO): Promise<User>
  deleteUser(userId: string): Promise<User>
}