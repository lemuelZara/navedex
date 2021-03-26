import { getRepository, Repository } from 'typeorm';

import { User } from '@modules/users/infra/typeorm/entities/user';
import { IUsersRepository } from '@modules/users/repositories/users-repository';
import { ICreateUserDTO } from '@modules/users/dtos/create-user';

export class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const findUser = await this.ormRepository.findOne({ where: { email } });

    return findUser;
  }

  public async create({ email, password }: ICreateUserDTO): Promise<User> {
    const createdUser = this.ormRepository.create({ email, password });

    await this.ormRepository.save(createdUser);

    return createdUser;
  }
}
