import { injectable, inject } from 'tsyringe';

import { AppError } from '@shared/errors/app-error';

import { Project } from '@modules/projects/infra/typeorm/entities/project';
import { IProjectsRepository } from '@modules/projects/repositories/projects-repository';

interface IRequest {
  id: string;
}

@injectable()
export class ShowProjectService {
  constructor(
    @inject('ProjectsRepository')
    private projectsRepository: IProjectsRepository
  ) {}

  public async execute({ id }: IRequest): Promise<Project> {
    const project = await this.projectsRepository.findById(id);

    if (!project) {
      throw new AppError('Project not found!');
    }

    return project;
  }
}
