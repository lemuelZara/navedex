import { getRepository, In, Repository } from 'typeorm';

import { Project } from '@modules/projects/infra/typeorm/entities/project';
import { IProjectsRepository } from '@modules/projects/repositories/projects-repository';
import { ICreateProjectDTO } from '@modules/projects/dtos/create-project';
import { IUpdateProjectDTO } from '@modules/projects/dtos/update-project';

interface IFindProjects {
  id: string;
}

export class ProjectsRepository implements IProjectsRepository {
  private ormRepository: Repository<Project>;

  constructor() {
    this.ormRepository = getRepository(Project);
  }

  public async findAllById(projects: IFindProjects[]): Promise<Project[]> {
    const projectsIds = projects.map((project) => project.id);

    const projectsFound = await this.ormRepository.find({
      where: {
        id: In([...projectsIds]),
      },
    });

    return projectsFound;
  }

  public async findOneOrFail(id: string): Promise<Project | undefined> {
    const project = await this.ormRepository.findOneOrFail(id);

    return project;
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }

  public async update(projectData: IUpdateProjectDTO): Promise<Project> {
    const project = await this.ormRepository.save(projectData);

    return project;
  }

  public async findById(id: string): Promise<Project | undefined> {
    return this.ormRepository.findOne({ where: { id } });
  }

  public async findAllByUserId(user_id: string): Promise<Project[]> {
    const projects = await this.ormRepository.find({
      where: {
        user: {
          id: user_id,
        },
      },
    });

    return projects;
  }

  public async findAll(name: string, user_id: string): Promise<Project[]> {
    const projects = await this.ormRepository.find({
      where: {
        name,
        user: { id: user_id },
      },
    });

    return projects;
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
