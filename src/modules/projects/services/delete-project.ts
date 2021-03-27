import { injectable, inject } from 'tsyringe';

import { AppError } from '@shared/errors/app-error';

import { IProjectsRepository } from '@modules/projects/repositories/projects-repository';

interface IRequest {
  user_id: string;
  id: string;
}

@injectable()
export class DeleteProjectService {
  constructor(
    @inject('ProjectsRepository')
    private projectsRepository: IProjectsRepository
  ) {}

  public async execute({ user_id, id }: IRequest): Promise<void> {
    const project = await this.projectsRepository.findById(id);

    if (!project) {
      throw new AppError('Project not found!');
    }

    if (project.user.id !== Number(user_id)) {
      throw new AppError("This Project doesn't belong to you!");
    }

    await this.projectsRepository.delete(id);
  }
}
