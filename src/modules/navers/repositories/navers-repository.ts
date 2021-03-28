import { Naver } from '@modules/navers/infra/typeorm/entities/naver';
import { ICreateNaverDTO } from '@modules/navers/dtos/create-naver';
import { IUpdateNaverDTO } from '@modules/navers/dtos/update-naver';

interface IFindNavers {
  id: string;
}

export interface INaversRepository {
  create(naverData: ICreateNaverDTO): Promise<Naver>;
  findById(id: string): Promise<Naver | undefined>;
  findAllById(navers: IFindNavers[]): Promise<Naver[]>;
  findAllByUserId(user_id: string): Promise<Naver[]>;
  findAllByName(name: string, user_id: string): Promise<Naver[]>;
  findAllByAdmissionDate(
    admission_date: Date,
    user_id: string
  ): Promise<Naver[]>;
  findAllByJobRole(job_role: string, user_id: string): Promise<Naver[]>;
  findOneOrFail(id: string): Promise<Naver | undefined>;
  update(naverData: IUpdateNaverDTO): Promise<Naver>;
  delete(id: string): Promise<void>;
}
