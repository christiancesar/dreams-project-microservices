import { inject, injectable } from "tsyringe";
import { UsersRepository } from "../repositories/implementations/UsersRepository";
import { User } from "../schemas/User";

@injectable()
export class ListUsersService {
  constructor(
    @inject('UsersRepository')
    private userRepository: UsersRepository
  ) { }

  async execute(): Promise<User[]> {
    const users = await this.userRepository.findAll()

    return users

  }
}