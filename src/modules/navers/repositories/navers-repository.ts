import { Naver } from '@modules/navers/infra/typeorm/entities/naver';
import { ICreateNaverDTO } from '@modules/navers/dtos/create-naver';

export interface INaversRepository {
  create(naverData: ICreateNaverDTO): Promise<Naver>;
}
