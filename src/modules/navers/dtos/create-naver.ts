import { Project } from '@modules/projects/infra/typeorm/entities/project';
import { User } from '@modules/users/infra/typeorm/entities/user';

export interface ICreateNaverDTO {
  user: User;
  name: string;
  birthdate: Date;
  admission_date: Date;
  job_role: string;
  projects: Project[];
}
