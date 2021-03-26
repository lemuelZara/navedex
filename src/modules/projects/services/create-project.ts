import { injectable, inject } from 'tsyringe';

import { AppError } from '@shared/errors/app-error';

import { Project } from '@modules/projects/infra/typeorm/entities/project';
import { IProjectsRepository } from '@modules/projects/repositories/projects-repository';

import { IUsersRepository } from '@modules/users/repositories/users-repository';

interface IRequest {
  user_id: string;
  name: string;
}

@injectable()
export class CreateProjectService {
  constructor(
    @inject('ProjectsRepository')
    private projectsRepository: IProjectsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  public async execute({ user_id, name }: IRequest): Promise<Project> {
    const findUser = await this.usersRepository.findById(user_id);

    if (!findUser) throw new AppError('User not found!');

    const projectAlreadyExists = await this.projectsRepository.findByName(name);

    if (projectAlreadyExists) throw new AppError('Project already exists!');

    const createdProject = await this.projectsRepository.create({
      user: findUser,
      name,
    });

    return createdProject;
  }
}
