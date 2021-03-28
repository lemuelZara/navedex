import { injectable, inject } from 'tsyringe';

import { AppError } from '@shared/errors/app-error';

import { Naver } from '@modules/navers/infra/typeorm/entities/naver';
import { INaversRepository } from '@modules/navers/repositories/navers-repository';

import { Project } from '@modules/projects/infra/typeorm/entities/project';
import { IProjectsRepository } from '@modules/projects/repositories/projects-repository';

interface IProject {
  id: string;
}

interface IRequest {
  naver_id: string;
  name: string;
  birthdate: Date;
  admission_date: Date;
  job_role: string;
  user_id: string;
  projects: IProject[];
}

@injectable()
export class UpdateNaverService {
  constructor(
    @inject('NaversRepository')
    private naversRepository: INaversRepository,

    @inject('ProjectsRepository')
    private projectsRepository: IProjectsRepository
  ) {}

  public async execute({
    naver_id,
    name,
    birthdate,
    admission_date,
    job_role,
    user_id,
    projects,
  }: IRequest): Promise<Naver> {
    let findProjects: Project[] = [];

    const naver = await this.naversRepository.findById(naver_id);

    if (!naver) {
      throw new AppError('Naver not found!');
    }

    if (naver.user.id !== Number(user_id)) {
      throw new AppError("This Naver doesn't belong to you!");
    }

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

    Object.assign(naver, {
      name,
      birthdate,
      admission_date,
      job_role,
      projects: findProjects,
    });

    return this.naversRepository.update(naver);
  }
}
