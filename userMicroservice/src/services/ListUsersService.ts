import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../repositories/interfaces/IUsersRepository";
import { User } from "../schemas/User";

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