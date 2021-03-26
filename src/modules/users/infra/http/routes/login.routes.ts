import { Router } from 'express';

import { LoginController } from '@modules/users/infra/http/controllers/login-controller';

const loginRouter = Router();
const loginController = new LoginController();

loginRouter.post('/', loginController.create);

export default loginRouter;
