import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { User } from '@modules/users/infra/typeorm/entities/user';

import { Naver } from '@modules/navers/infra/typeorm/entities/naver';

@Entity('projects')
export class Project {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => User, (user) => user.projects, {
    eager: true,
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToMany(() => Naver, (naver) => naver.projects, {
    cascade: true,
  })
  @JoinTable({
    name: 'navers_projects',
    joinColumn: {
      name: 'project_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'naver_id',
      referencedColumnName: 'id',
    },
  })
  navers: Naver[];

  @Column()
  name: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
