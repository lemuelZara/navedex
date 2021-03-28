import { injectable, inject } from 'tsyringe';

import { AppError } from '@shared/errors/app-error';

import { Project } from '@modules/projects/infra/typeorm/entities/project';
import { IProjectsRepository } from '@modules/projects/repositories/projects-repository';

import { IUsersRepository } from '@modules/users/repositories/users-repository';

import { Naver } from '@modules/navers/infra/typeorm/entities/naver';
import { INaversRepository } from '@modules/navers/repositories/navers-repository';

interface INaver {
  id: string;
}

interface IRequest {
  user_id: string;
  name: string;
  navers: INaver[];
}

@injectable()
export class CreateProjectService {
  constructor(
    @inject('ProjectsRepository')
    private projectsRepository: IProjectsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('NaversRepository')
    private naversRepository: INaversRepository
  ) {}

  public async execute({ user_id, name, navers }: IRequest): Promise<Project> {
    let findNavers: Naver[] = [];

    const findUser = await this.usersRepository.findById(user_id);

    if (!findUser) throw new AppError('User not found!');

    const projectAlreadyExists = await this.projectsRepository.findByName(name);

    if (projectAlreadyExists) throw new AppError('Project already exists!');

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

    const createdProject = await this.projectsRepository.create({
      user: findUser,
      name,
      navers: findNavers,
    });

    return createdProject;
  }
}
