import { status } from "@grpc/grpc-js";
import { inject, injectable } from "tsyringe";
import type { ShowUserRequestDTO } from "../dtos/ShowUserRequestDTO.js";
import type { IUsersRepository } from "../repositories/interfaces/IUsersRepository.js";
import type { User } from "../entities/UserEntity.js";
import { AppError } from "../../shared/errors/AppError.js";
import { isValidObjectId } from "../../shared/utils/isValidObjectId.js";

@injectable()
export class ShowUserService {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUsersRepository
  ) { }

  async execute({ userId }: ShowUserRequestDTO): Promise<User> {

    if (!isValidObjectId(userId)) throw new AppError({ code: status.INVALID_ARGUMENT, name: 'Show User', message: 'Sorry, but property id is not valid.' });


    const user = await this.userRepository.findByUserId(userId)

    if (!user) throw new AppError({ code: status.INVALID_ARGUMENT, name: 'Show User', message: 'Sorry, but user not exist.' });

    return user
  }
}