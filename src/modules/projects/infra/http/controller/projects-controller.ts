import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateProjectService } from '@modules/projects/services/create-project';
import { FindProjectService } from '@modules/projects/services/find-project';

export class ProjectsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { user } = request;
    const { name } = request.body;

    const createProjectService = container.resolve(CreateProjectService);

    const project = await createProjectService.execute({
      user_id: user.id,
      name,
    });

    return response.status(201).json(project);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const { user } = request;
    const filters = request.query;

    const name = filters.name as string;

    const findAllProjects = container.resolve(FindProjectService);

    const projects = await findAllProjects.execute({
      user_id: user.id,
      name,
    });

    return response.status(200).json(projects);
  }
}
