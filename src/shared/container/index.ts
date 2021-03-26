import { container } from 'tsyringe';

import { IUsersRepository } from '@modules/users/repositories/users-repository';
import { UsersRepository } from '@modules/users/infra/typeorm/repositories/users-repository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository
);
