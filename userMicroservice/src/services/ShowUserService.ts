import { status } from "@grpc/grpc-js";
import ObjectID from "bson-objectid";
import { inject, injectable } from "tsyringe";
import AppError from "../../errors/AppError";
import { UsersRepository } from "../repositories/implementations/UsersRepository";
import { User } from "../schemas/User";

type ShowUserParams = {
  userId: string
}


@injectable()
export class ShowUserService {
  constructor(
    @inject('UsersRepository')
    private userRepository: UsersRepository
  ) { }

  async execute({ userId }: ShowUserParams): Promise<User> {

    if (!ObjectID.isValid(userId)) throw new AppError({ code: status.INVALID_ARGUMENT, name: 'Show User', message: 'Sorry, but property id is not valid.' });

   
    const user = await this.userRepository.findByUserId(userId)
    
    if (!user) throw new AppError({ code: status.INVALID_ARGUMENT, name: 'Show User', message: 'Sorry, but user not exist.' });
    
    return user
  }
}