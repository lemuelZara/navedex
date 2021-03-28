import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { User } from '@modules/users/infra/typeorm/entities/user';

import { Project } from '@modules/projects/infra/typeorm/entities/project';

@Entity('navers')
export class Naver {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => User, (user) => user.navers, {
    eager: true,
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToMany(() => Project, (project) => project.navers)
  projects: Project[];

  @Column()
  name: string;

  @Column()
  birthdate: Date;

  @Column()
  admission_date: Date;

  @Column()
  job_role: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
