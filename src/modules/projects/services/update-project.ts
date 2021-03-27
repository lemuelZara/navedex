import { injectable, inject } from 'tsyringe';

import { AppError } from '@shared/errors/app-error';

import { Project } from 'modules/projects/infra/typeorm/entities/project';
import { IProjectsRepository } from '@modules/projects/repositories/projects-repository';

interface IRequest {
  user_id: string;
  id: string;
  name: string;
}

@injectable()
export class UpdateProjectService {
  constructor(
    @inject('ProjectsRepository')
    private projectsRepository: IProjectsRepository
  ) {}

  public async execute({ user_id, id, name }: IRequest): Promise<Project> {
    const project = await this.projectsRepository.findById(id);

    if (!project) {
      throw new AppError('Project not found!');
    }

    if (project.user.id !== Number(user_id)) {
      throw new AppError("This Project doesn't belong to you!");
    }

    Object.assign(project, { name });

    return this.projectsRepository.update(project);
  }
}
