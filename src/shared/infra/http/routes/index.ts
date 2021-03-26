import { Router } from 'express';

import { ensureAuthentication } from '@modules/users/infra/http/middlewares/ensure-authentication';
import { usersRouter, loginRouter } from '@modules/users/infra/http/routes';

import { naversRouter } from '@modules/navers/infra/http/routes/navers.routes';
import { projectsRouter } from '@modules/projects/infra/http/routes/projects.routes';

const routes = Router();

routes.use('/signup', usersRouter);
routes.use('/login', loginRouter);

routes.use(ensureAuthentication);

routes.use('/navers', naversRouter);
routes.use('/projects', projectsRouter);

export default routes;
