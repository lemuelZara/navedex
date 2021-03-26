import { User } from '@modules/users/infra/typeorm/entities/user';

export interface ICreateProjectDTO {
  user: User;
  name: string;
}
