import { injectable, inject } from 'tsyringe';

import { AppError } from '@shared/errors/app-error';

import { User } from '@modules/users/infra/typeorm/entities/user';
import { IUsersRepository } from '@modules/users/repositories/users-repository';
import { IHashProvider } from '@modules/users/providers/HashProvider/models/hash-provider';

interface IRequest {
  email: string;
  password: string;
}

@injectable()
export class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider
  ) {}

  public async execute({ email, password }: IRequest): Promise<User> {
    const userEmailAlreadyExists = await this.usersRepository.findByEmail(
      email
    );

    if (userEmailAlreadyExists) {
      throw new AppError(
        "There's already a user registered with that email. Please, try it again with another email."
      );
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const createdUser = this.usersRepository.create({
      email,
      password: hashedPassword,
    });

    return createdUser;
  }
}
