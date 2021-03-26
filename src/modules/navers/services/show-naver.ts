import { injectable, inject } from 'tsyringe';

import { Naver } from '@modules/navers/infra/typeorm/entities/naver';
import { INaversRepository } from '@modules/navers/repositories/navers-repository';
import { AppError } from '@shared/errors/app-error';

interface IRequest {
  id: string;
}

@injectable()
export class ShowNaverService {
  constructor(
    @inject('NaversRepository')
    private naversRepository: INaversRepository
  ) {}

  public async execute({ id }: IRequest): Promise<Naver> {
    const findNaver = await this.naversRepository.findById(id);

    if (!findNaver) {
      throw new AppError('Naver not found!');
    }

    return findNaver;
  }
}
