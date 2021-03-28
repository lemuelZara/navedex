import { injectable, inject } from 'tsyringe';

import { AppError } from '@shared/errors/app-error';

import { Naver } from '@modules/navers/infra/typeorm/entities/naver';
import { INaversRepository } from '@modules/navers/repositories/navers-repository';

import { IUsersRepository } from '@modules/users/repositories/users-repository';

import { Project } from '@modules/projects/infra/typeorm/entities/project';
import { IProjectsRepository } from '@modules/projects/repositories/projects-repository';

interface IProject {
  id: string;
}

interface IRequest {
  user_id: string;
  name: string;
  birthdate: Date;
  admission_date: Date;
  job_role: string;
  projects: IProject[];
}

@injectable()
export class CreateNaverService {
  constructor(
    @inject('NaversRepository')
    private naversRepository: INaversRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('ProjectsRepository')
    private projectsRepository: IProjectsRepository
  ) {}

  public async execute({
    user_id,
    name,
    birthdate,
    admission_date,
    job_role,
    projects,
  }: IRequest): Promise<Naver> {
    let findProjects: Project[] = [];

    const findUser = await this.usersRepository.findById(user_id);

    if (!findUser) throw new AppError('User not found!');

    try {
      const verifyProjects = projects.map((project) =>
        this.projectsRepository.findOneOrFail(project.id)
      );

      await Promise.all(verifyProjects);
    } catch (error) {
      throw new AppError('Project not found!');
    }

    if (projects.length === 0) {
      findProjects = [];
    } else {
      findProjects = await this.projectsRepository.findAllById(projects);
    }

    const createdNaver = await this.naversRepository.create({
      user: findUser,
      name,
      birthdate,
      admission_date,
      job_role,
      projects: findProjects,
    });

    return createdNaver;
  }
}
