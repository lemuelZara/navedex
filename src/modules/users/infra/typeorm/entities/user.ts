import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
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

  @OneToMany(() => Naver, (naver) => naver.user, {
    cascade: ['insert', 'update', 'remove'],
  })
  @JoinColumn({ name: 'user_id' })
  navers: Naver[];

  @OneToMany(() => Project, (project) => project.user, {
    cascade: ['insert', 'update', 'remove'],
  })
  @JoinColumn({ name: 'user_id' })
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
