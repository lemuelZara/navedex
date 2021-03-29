import { Naver } from '@modules/navers/infra/typeorm/entities/naver';

export interface IUpdateProjectDTO {
  name: string;
  navers: Naver[];
}
