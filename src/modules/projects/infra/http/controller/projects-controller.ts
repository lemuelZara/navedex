import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateProjectService } from '@modules/projects/services/create-project';
import { FindProjectService } from '@modules/projects/services/find-project';
import { ShowProjectService } from '@modules/projects/services/show-project';
import { UpdateProjectService } from '@modules/projects/services/update-project';
import { DeleteProjectService } from '@modules/projects/services/delete-project';

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

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showProjectService = container.resolve(ShowProjectService);

    const project = await showProjectService.execute({ id });

    return response.status(200).json(project);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { user } = request;
    const { id } = request.params;
    const { name } = request.body;

    const updateProjectService = container.resolve(UpdateProjectService);

    const project = await updateProjectService.execute({
      user_id: user.id,
      id,
      name,
    });

    return response.status(200).json(project);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { user } = request;
    const { id } = request.params;

    const deleteProjectService = container.resolve(DeleteProjectService);

    await deleteProjectService.execute({ user_id: user.id, id });

    return response.status(200).json({
      message: 'Project successfully deleted!',
    });
  }
}
