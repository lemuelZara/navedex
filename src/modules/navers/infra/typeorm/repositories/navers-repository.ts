import { getRepository, Repository } from 'typeorm';

import { Naver } from '@modules/navers/infra/typeorm/entities/naver';
import { INaversRepository } from '@modules/navers/repositories/navers-repository';
import { ICreateNaverDTO } from '@modules/navers/dtos/create-naver';

export class NaversRepository implements INaversRepository {
  private ormRepository: Repository<Naver>;

  constructor() {
    this.ormRepository = getRepository(Naver);
  }

  public async create({
    user,
    name,
    birthdate,
    admission_date,
    job_role,
  }: ICreateNaverDTO): Promise<Naver> {
    const createdNaver = this.ormRepository.create({
      user,
      name,
      birthdate,
      admission_date,
      job_role,
    });

    await this.ormRepository.save(createdNaver);

    return createdNaver;
  }
}
