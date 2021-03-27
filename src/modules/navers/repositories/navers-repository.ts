import { Naver } from '@modules/navers/infra/typeorm/entities/naver';
import { ICreateNaverDTO } from '@modules/navers/dtos/create-naver';
import { IUpdateNaverDTO } from '@modules/navers/dtos/update-naver';

export interface INaversRepository {
  create(naverData: ICreateNaverDTO): Promise<Naver>;
  findById(id: string): Promise<Naver | undefined>;
  findAllByUserId(user_id: string): Promise<Naver[]>;
  findAllByName(name: string, user_id: string): Promise<Naver[]>;
  findAllByAdmissionDate(
    admission_date: Date,
    user_id: string
  ): Promise<Naver[]>;
  findAllByJobRole(job_role: string, user_id: string): Promise<Naver[]>;
  update(naverData: IUpdateNaverDTO): Promise<Naver>;
  delete(id: string): Promise<void>;
}
