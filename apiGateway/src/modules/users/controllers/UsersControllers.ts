import { Request, Response } from 'express';
import { CreateUserService } from "../services/CreateUserService";
import { ListUsersService } from "../services/ListUsersService";
import { ShowUserService } from "../services/ShowUserService";
import { UpdateUserService } from '../services/UpdateUserService';


export class UsersControllers {

  async create(request: Request, response: Response): Promise<Response> {
    const { firstName, lastName, birthday, age, email } = request.body;

    const createUserService = new CreateUserService();
    
    const user = await createUserService.execute({
      firstName,
      lastName,
      birthday,
      age,
      email
    })

    return response.json(user)
  }

  async index(request: Request, response: Response): Promise<Response> {
    const listUsersService = new ListUsersService();

    const users = await listUsersService.execute()
    
    return response.json(users)
  }

  async show(request: Request, response: Response): Promise<Response> {
    const { userId } = request.params;
    
    const showUserService = new ShowUserService();

    const user = await showUserService.execute({ userId })
    
    return response.json(user)
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { id, firstname, lastname, birthday, age, email } = request.body;

    const updateUserService = new UpdateUserService();
    
    const user = await updateUserService.execute({
      id,
      firstname,
      lastname,
      birthday,
      age,
      email
    })

    return response.json(user)
  }
}