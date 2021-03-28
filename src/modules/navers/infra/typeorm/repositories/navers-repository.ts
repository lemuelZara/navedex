import { getRepository, In, Repository } from 'typeorm';

import { Naver } from '@modules/navers/infra/typeorm/entities/naver';
import { INaversRepository } from '@modules/navers/repositories/navers-repository';
import { ICreateNaverDTO } from '@modules/navers/dtos/create-naver';
import { IUpdateNaverDTO } from '@modules/navers/dtos/update-naver';

interface IFindNavers {
  id: string;
}

export class NaversRepository implements INaversRepository {
  private ormRepository: Repository<Naver>;

  constructor() {
    this.ormRepository = getRepository(Naver);
  }

  public async findAllById(navers: IFindNavers[]): Promise<Naver[]> {
    const naversIds = navers.map((naver) => naver.id);

    const naversFound = await this.ormRepository.find({
      where: {
        id: In([...naversIds]),
      },
    });

    return naversFound;
  }

  public async findOneOrFail(id: string): Promise<Naver | undefined> {
    const naver = await this.ormRepository.findOneOrFail(id);

    return naver;
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }

  public async update(naverData: IUpdateNaverDTO): Promise<Naver> {
    const naver = await this.ormRepository.save(naverData);

    return naver;
  }

  public async findById(id: string): Promise<Naver | undefined> {
    const findNaver = await this.ormRepository.findOne({
      where: { id },
      relations: ['projects'],
    });

    return findNaver;
  }

  public async findAllByName(name: string, user_id: string): Promise<Naver[]> {
    const findNavers = await this.ormRepository.find({
      where: {
        name,
        user: {
          id: user_id,
        },
      },
      relations: ['projects'],
    });

    return findNavers;
  }

  public async findAllByAdmissionDate(
    admission_date: Date,
    user_id: string
  ): Promise<Naver[]> {
    const findNavers = await this.ormRepository.find({
      where: {
        admission_date: new Date(admission_date),
        user: {
          id: user_id,
        },
      },
      relations: ['projects'],
    });

    return findNavers;
  }

  public async findAllByJobRole(
    job_role: string,
    user_id: string
  ): Promise<Naver[]> {
    const findNavers = await this.ormRepository.find({
      where: {
        job_role,
        user: {
          id: user_id,
        },
      },
      relations: ['projects'],
    });

    return findNavers;
  }

  public async findAllByUserId(user_id: string): Promise<Naver[]> {
    const findAllNavers = await this.ormRepository.find({
      where: {
        user: {
          id: user_id,
        },
      },
      relations: ['projects'],
    });

    return findAllNavers;
  }

  public async create({
    user,
    name,
    birthdate,
    admission_date,
    job_role,
    projects,
  }: ICreateNaverDTO): Promise<Naver> {
    const createdNaver = this.ormRepository.create({
      name,
      birthdate,
      admission_date,
      job_role,
      user,
      projects,
    });

    await this.ormRepository.save(createdNaver);

    return createdNaver;
  }
}
