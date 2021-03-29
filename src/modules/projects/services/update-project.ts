import { injectable, inject } from 'tsyringe';

import { AppError } from '@shared/errors/app-error';

import { Project } from 'modules/projects/infra/typeorm/entities/project';
import { IProjectsRepository } from '@modules/projects/repositories/projects-repository';

import { Naver } from '@modules/navers/infra/typeorm/entities/naver';
import { INaversRepository } from '@modules/navers/repositories/navers-repository';

interface INaver {
  id: string;
}

interface IRequest {
  user_id: string;
  id: string;
  name: string;
  navers: INaver[];
}

@injectable()
export class UpdateProjectService {
  constructor(
    @inject('ProjectsRepository')
    private projectsRepository: IProjectsRepository,

    @inject('NaversRepository')
    private naversRepository: INaversRepository
  ) {}

  public async execute({
    user_id,
    id,
    name,
    navers,
  }: IRequest): Promise<Project> {
    let findNavers: Naver[] = [];

    const project = await this.projectsRepository.findById(id);

    if (!project) {
      throw new AppError('Project not found!');
    }

    if (project.user.id !== Number(user_id)) {
      throw new AppError("This Project doesn't belong to you!");
    }

    try {
      const verifyNavers = navers.map((naver) =>
        this.naversRepository.findOneOrFail(naver.id)
      );

      await Promise.all(verifyNavers);
    } catch (error) {
      throw new AppError('Naver not found!');
    }

    if (navers.length === 0) {
      findNavers = [];
    } else {
      findNavers = await this.naversRepository.findAllById(navers);
    }

    Object.assign(project, { name, navers: findNavers });

    return this.projectsRepository.update(project);
  }
}
