import { User } from '@modules/users/infra/typeorm/entities/user';
import { ICreateUserDTO } from '@modules/users/dtos/create-user';

export interface IUsersRepository {
  create(userData: ICreateUserDTO): Promise<User>;
  findByEmail(email: string): Promise<User | undefined>;
}
