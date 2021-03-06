import { Router } from 'express';

import { NaversController } from '@modules/navers/infra/http/controller/navers-controller';
import { createNaverValidator } from '@modules/navers/infra/validators/create-naver-validator';

const naversRouter = Router();
const naversControllers = new NaversController();

naversRouter.post('/', createNaverValidator, naversControllers.create);
naversRouter.get('/', naversControllers.index);
naversRouter.get('/:id', naversControllers.show);
naversRouter.put('/:id', naversControllers.update);
naversRouter.delete('/:id', naversControllers.delete);

export { naversRouter };
