import { getRepository, Repository } from 'typeorm';

import { Naver } from '@modules/navers/infra/typeorm/entities/naver';
import { INaversRepository } from '@modules/navers/repositories/navers-repository';
import { ICreateNaverDTO } from '@modules/navers/dtos/create-naver';

export class NaversRepository implements INaversRepository {
  private ormRepository: Repository<Naver>;

  constructor() {
    this.ormRepository = getRepository(Naver);
  }

  findAllByName(name: string, user_id: string): Promise<Naver[]> {
    return this.ormRepository.find({
      where: {
        name,
        user: {
          id: user_id,
        },
      },
    });
  }

  findAllByAdmissionDate(
    admission_date: Date,
    user_id: string
  ): Promise<Naver[]> {
    return this.ormRepository.find({
      where: {
        admission_date: new Date(admission_date),
        user: {
          id: user_id,
        },
      },
    });
  }

  findAllByJobRole(job_role: string, user_id: string): Promise<Naver[]> {
    return this.ormRepository.find({
      where: {
        job_role,
        user: {
          id: user_id,
        },
      },
    });
  }

  public async findAllByUserId(user_id: string): Promise<Naver[]> {
    const findAllNavers = await this.ormRepository.find({
      where: {
        user: {
          id: user_id,
        },
      },
    });

    return findAllNavers;
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
