import { injectable, inject } from 'tsyringe';

import { User } from '@modules/users/infra/typeorm/entities/user';
import { IUsersRepository } from '@modules/users/repositories/users-repository';

interface IRequest {
  email: string;
  password: string;
}

@injectable()
export class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  public async execute({ email, password }: IRequest): Promise<User> {
    const userEmailAlreadyExists = await this.usersRepository.findByEmail(
      email
    );

    if (userEmailAlreadyExists) {
      throw new Error(
        "There's already a user registered with that email. Please, try it again with another email."
      );
    }

    const createdUser = this.usersRepository.create({ email, password });

    return createdUser;
  }
}
