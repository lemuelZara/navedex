import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Naver } from '@modules/navers/infra/typeorm/entities/naver';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @OneToMany(() => Naver, (naver) => naver.user)
  navers: Naver[];

  @Column()
  email: string;

  @Column()
  password: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
