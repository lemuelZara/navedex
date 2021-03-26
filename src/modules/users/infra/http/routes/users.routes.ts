import { Router } from 'express';

import { UsersController } from '@modules/users/infra/http/controllers/users-controller';
import { createUserValidator } from '@modules/users/infra/validators/create-user-validator';

const usersRouter = Router();
const usersController = new UsersController();

usersRouter.post('/', createUserValidator, usersController.create);

export default usersRouter;
