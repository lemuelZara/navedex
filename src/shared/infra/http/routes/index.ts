import { Router } from 'express';

import usersRouter from '@modules/users/infra/http/routes/users.routes';

const routes = Router();

routes.use('/signup', usersRouter);

export default routes;
