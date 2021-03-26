import { injectable, inject } from 'tsyringe';

import { AppError } from '@shared/errors/app-error';

import { Naver } from '@modules/navers/infra/typeorm/entities/naver';
import { INaversRepository } from '@modules/navers/repositories/navers-repository';

interface IRequest {
  user_id: string;
  id: string;
  name: string;
  birthdate: Date;
  admission_date: Date;
  job_role: string;
}

@injectable()
export class UpdateNaverService {
  constructor(
    @inject('NaversRepository')
    private naversRepository: INaversRepository
  ) {}

  public async execute({
    user_id,
    id,
    name,
    birthdate,
    admission_date,
    job_role,
  }: IRequest): Promise<Naver> {
    const naver = await this.naversRepository.findById(id);

    if (!naver) {
      throw new AppError('Naver not found!');
    }

    if (naver.user.id !== Number(user_id)) {
      throw new AppError("This Naver doesn't belong to you!");
    }

    Object.assign(naver, {
      name,
      birthdate,
      admission_date,
      job_role,
    });

    return this.naversRepository.update(naver);
  }
}
