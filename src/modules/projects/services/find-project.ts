import { injectable, inject } from 'tsyringe';

import { Project } from 'modules/projects/infra/typeorm/entities/project';
import { IProjectsRepository } from '@modules/projects/repositories/projects-repository';

interface IRequest {
  user_id: string;
  name: string;
}

@injectable()
export class FindProjectService {
  constructor(
    @inject('ProjectsRepository')
    private projectsRepository: IProjectsRepository
  ) {}

  public async execute({ user_id, name }: IRequest): Promise<Project[]> {
    if (!name) {
      return this.projectsRepository.findAllByUserId(user_id);
    }

    return this.projectsRepository.findAll(name, user_id);
  }
}
