import { inject, injectable } from "tsyringe";
import type { IUsersRepository } from "../repositories/interfaces/IUsersRepository.js";
import type { User } from "../entities/UserEntity.js";

@injectable()
export class ListUsersService {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUsersRepository
  ) { }

  async execute(): Promise<User[]> {
    const users = await this.userRepository.findAll()

    return users

  }
}