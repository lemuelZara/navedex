import { injectable, inject } from 'tsyringe';
import { sign } from 'jsonwebtoken';

import { AppError } from '@shared/errors/app-error';

import authConfig from '@config/authentication';

import { User } from '@modules/users/infra/typeorm/entities/user';
import { IUsersRepository } from '@modules/users/repositories/users-repository';
import { IHashProvider } from '@modules/users/providers/HashProvider/models/hash-provider';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

@injectable()
export class AuthUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider
  ) {}

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const findUser = await this.usersRepository.findByEmail(email);

    if (!findUser) {
      throw new AppError('Incorrect Email/Password validation', 401);
    }

    const passwordIsValid = await this.hashProvider.compareHash(
      password,
      findUser.password
    );

    if (!passwordIsValid) {
      throw new AppError('Incorrect Email/Password validation', 401);
    }

    const token = sign({}, authConfig.privateKey, {
      algorithm: 'RS256',
      subject: String(findUser.id),
      expiresIn: authConfig.expiresIn,
    });

    return {
      user: findUser,
      token,
    };
  }
}
