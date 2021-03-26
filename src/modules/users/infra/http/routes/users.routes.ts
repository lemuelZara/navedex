import { Router } from 'express';

import { UsersController } from '@modules/users/infra/http/controllers/users-controller';

const usersRouter = Router();
const usersController = new UsersController();

usersRouter.post('/', usersController.create);

export default usersRouter;
