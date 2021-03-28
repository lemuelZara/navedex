import { User } from '@modules/users/infra/typeorm/entities/user';

import { Naver } from '@modules/navers/infra/typeorm/entities/naver';

export interface ICreateProjectDTO {
  user: User;
  name: string;
  navers: Naver[];
}
