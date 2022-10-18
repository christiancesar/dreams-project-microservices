import { status } from "@grpc/grpc-js";
import ObjectID from "bson-objectid";
import { inject, injectable } from "tsyringe";
import AppError from "../../errors/AppError";
import { ShowUserRequestDTO } from "../dtos/ShowUserRequestDTO";
import { IUsersRepository } from "../repositories/interfaces/IUsersRepository";
import { User } from "../entities/UserEntity";

@injectable()
export class ShowUserService {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUsersRepository
  ) { }

  async execute({ userId }: ShowUserRequestDTO): Promise<User> {

    if (!ObjectID.isValid(userId)) throw new AppError({ code: status.INVALID_ARGUMENT, name: 'Show User', message: 'Sorry, but property id is not valid.' });

   
    const user = await this.userRepository.findByUserId(userId)
    
    if (!user) throw new AppError({ code: status.INVALID_ARGUMENT, name: 'Show User', message: 'Sorry, but user not exist.' });
    
    return user
  }
}