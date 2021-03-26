import { getRepository, Repository } from 'typeorm';

import { Project } from '@modules/projects/infra/typeorm/entities/project';
import { IProjectsRepository } from '@modules/projects/repositories/projects-repository';
import { ICreateProjectDTO } from '@modules/projects/dtos/create-project';

export class ProjectsRepository implements IProjectsRepository {
  private ormRepository: Repository<Project>;

  constructor() {
    this.ormRepository = getRepository(Project);
  }

  public async findByName(name: string): Promise<Project | undefined> {
    const findProject = await this.ormRepository.findOne({ where: { name } });

    return findProject;
  }

  public async create({ user, name }: ICreateProjectDTO): Promise<Project> {
    const createdProject = this.ormRepository.create({ user, name });

    await this.ormRepository.save(createdProject);

    return createdProject;
  }
}
