import { Router } from "express";
import { UsersControllers } from "../controllers/UsersControllers";


const usersRouter = Router()
const usersControllers = new UsersControllers();

usersRouter.post('/', usersControllers.create);
usersRouter.get('/', usersControllers.index);
usersRouter.get('/:userId', usersControllers.show);
usersRouter.patch('/', usersControllers.update);

export default usersRouter