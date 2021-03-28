import { Project } from '@modules/projects/infra/typeorm/entities/project';
import { ICreateProjectDTO } from '@modules/projects/dtos/create-project';
import { IUpdateProjectDTO } from '@modules/projects/dtos/update-project';

interface IFindProjects {
  id: string;
}

export interface IProjectsRepository {
  create(naverData: ICreateProjectDTO): Promise<Project>;
  findById(id: string): Promise<Project | undefined>;
  findAllById(projects: IFindProjects[]): Promise<Project[]>;
  findByName(name: string): Promise<Project | undefined>;
  findAllByUserId(user_id: string): Promise<Project[]>;
  findAll(name: string, user_id: string): Promise<Project[]>;
  findOneOrFail(id: string): Promise<Project | undefined>;
  update(projectData: IUpdateProjectDTO): Promise<Project>;
  delete(id: string): Promise<void>;
}
