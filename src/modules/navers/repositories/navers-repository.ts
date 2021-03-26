import { Naver } from '@modules/navers/infra/typeorm/entities/naver';
import { ICreateNaverDTO } from '@modules/navers/dtos/create-naver';

export interface INaversRepository {
  create(naverData: ICreateNaverDTO): Promise<Naver>;
  findAllByUserId(user_id: string): Promise<Naver[]>;
  findAllByName(name: string, user_id: string): Promise<Naver[]>;
  findAllByAdmissionDate(
    admission_date: Date,
    user_id: string
  ): Promise<Naver[]>;
  findAllByJobRole(job_role: string, user_id: string): Promise<Naver[]>;
}
