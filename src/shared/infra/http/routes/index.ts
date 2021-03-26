import { Router } from 'express';

import usersRouter from '@modules/users/infra/http/routes/users.routes';
import loginRouter from '@modules/users/infra/http/routes/login.routes';

const routes = Router();

routes.use('/signup', usersRouter);
routes.use('/login', loginRouter);

export default routes;
