import { Router } from 'express';

import { LoginController } from '@modules/users/infra/http/controllers/login-controller';
import { loginUserValidator } from '@modules/users/infra/validators';

const loginRouter = Router();
const loginController = new LoginController();

loginRouter.post('/', loginUserValidator, loginController.create);

export { loginRouter };
