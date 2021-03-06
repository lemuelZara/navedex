import { Router } from 'express';

import { ProjectsController } from '@modules/projects/infra/http/controller/projects-controller';
import { createProjectValidator } from '@modules/projects/infra/validators/create-project-validator';

const projectsRouter = Router();
const projectsController = new ProjectsController();

projectsRouter.post('/', createProjectValidator, projectsController.create);
projectsRouter.get('/', projectsController.index);
projectsRouter.get('/:id', projectsController.show);
projectsRouter.put('/:id', projectsController.update);
projectsRouter.delete('/:id', projectsController.delete);

export { projectsRouter };
