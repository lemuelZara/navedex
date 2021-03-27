import { Project } from '@modules/projects/infra/typeorm/entities/project';
import { ICreateProjectDTO } from '@modules/projects/dtos/create-project';
import { IUpdateProjectDTO } from '@modules/projects/dtos/update-project';

export interface IProjectsRepository {
  create(naverData: ICreateProjectDTO): Promise<Project>;
  findById(id: string): Promise<Project | undefined>;
  findByName(name: string): Promise<Project | undefined>;
  findAllByUserId(user_id: string): Promise<Project[]>;
  findAll(name: string, user_id: string): Promise<Project[]>;
  update(projectData: IUpdateProjectDTO): Promise<Project>;
}
