import { container } from 'tsyringe';

import { IUsersRepository } from '@modules/users/repositories/users-repository';
import { UsersRepository } from '@modules/users/infra/typeorm/repositories/users-repository';

import { IHashProvider } from '@modules/users/providers/HashProvider/models/hash-provider';
import { BCryptHashProvider } from '@modules/users/providers/HashProvider/implementations/bcrypt-hash-provider';

import { INaversRepository } from '@modules/navers/repositories/navers-repository';
import { NaversRepository } from '@modules/navers/infra/typeorm/repositories/navers-repository';

import { IProjectsRepository } from '@modules/projects/repositories/projects-repository';
import { ProjectsRepository } from '@modules/projects/infra/typeorm/repositories/projects-repository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository
);

container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider);

container.registerSingleton<INaversRepository>(
  'NaversRepository',
  NaversRepository
);

container.registerSingleton<IProjectsRepository>(
  'ProjectsRepository',
  ProjectsRepository
);
