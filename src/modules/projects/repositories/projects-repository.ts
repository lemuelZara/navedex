import { Project } from '@modules/projects/infra/typeorm/entities/project';
import { ICreateProjectDTO } from '@modules/projects/dtos/create-project';

export interface IProjectsRepository {
  create(naverData: ICreateProjectDTO): Promise<Project>;
  findByName(name: string): Promise<Project | undefined>;
}
