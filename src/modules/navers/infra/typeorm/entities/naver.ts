import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { User } from '@modules/users/infra/typeorm/entities/user';
import { Project } from '@modules/projects/infra/typeorm/entities/project';
import { NaverProject } from '@modules/navers/infra/typeorm/entities/naver-project';

@Entity('navers')
export class Naver {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => User, (user) => user.navers)
  @JoinColumn({ name: 'user_id' })
  user: User;

  projects: Project[];

  @OneToMany(() => NaverProject, (naverProject) => naverProject.naver, {
    cascade: ['insert', 'update', 'remove'],
  })
  @JoinColumn({ name: 'naver_id' })
  projectsConnection: Promise<NaverProject[]>;

  @Column()
  name: string;

  @Column()
  birthdate: Date;

  @Column()
  admission_date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
