import { injectable, inject } from 'tsyringe';

import { AppError } from '@shared/errors/app-error';

import { INaversRepository } from '@modules/navers/repositories/navers-repository';

interface IRequest {
  user_id: string;
  id: string;
}

@injectable()
export class DeleteNaverService {
  constructor(
    @inject('NaversRepository')
    private naversRepository: INaversRepository
  ) {}

  public async execute({ user_id, id }: IRequest): Promise<void> {
    const naver = await this.naversRepository.findById(id);

    if (!naver) {
      throw new AppError('Naver not found!');
    }

    if (naver.user.id !== Number(user_id)) {
      throw new AppError("This Naver doesn't belong to you!");
    }

    await this.naversRepository.delete(id);
  }
}
