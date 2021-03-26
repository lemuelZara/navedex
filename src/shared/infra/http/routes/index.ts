import { Router } from 'express';

import { usersRouter, loginRouter } from '@modules/users/infra/http/routes';

const routes = Router();

routes.use('/signup', usersRouter);
routes.use('/login', loginRouter);

export default routes;
