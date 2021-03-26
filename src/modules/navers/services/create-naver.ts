import { injectable, inject } from 'tsyringe';

import { Naver } from '@modules/navers/infra/typeorm/entities/naver';
import { INaversRepository } from '@modules/navers/repositories/navers-repository';

import { IUsersRepository } from '@modules/users/repositories/users-repository';
import { AppError } from '@shared/errors/app-error';

interface IRequest {
  user_id: string;
  name: string;
  birthdate: Date;
  admission_date: Date;
  job_role: string;
}

@injectable()
export class CreateNaverService {
  constructor(
    @inject('NaversRepository')
    private naversRepository: INaversRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  public async execute({
    user_id,
    name,
    birthdate,
    admission_date,
    job_role,
  }: IRequest): Promise<Naver> {
    const findUser = await this.usersRepository.findById(user_id);

    if (!findUser) throw new AppError('User not found!');

    const createdNaver = await this.naversRepository.create({
      user: findUser,
      name,
      birthdate,
      admission_date,
      job_role,
    });

    return createdNaver;
  }
}
