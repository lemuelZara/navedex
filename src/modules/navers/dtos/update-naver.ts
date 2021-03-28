import { Project } from '@modules/projects/infra/typeorm/entities/project';

export interface IUpdateNaverDTO {
  name: string;
  birthdate: Date;
  admission_date: Date;
  job_role: string;
  projects: Project[];
}
