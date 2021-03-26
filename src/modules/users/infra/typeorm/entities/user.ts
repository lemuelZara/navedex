import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Naver } from '@modules/navers/infra/typeorm/entities/naver';
import { Project } from '@modules/projects/infra/typeorm/entities/project';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @OneToMany(() => Naver, (naver) => naver.user)
  navers: Naver[];

  @OneToMany(() => Project, (project) => project.user)
  projects: Project[];

  @Column()
  email: string;

  @Column()
  password: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
