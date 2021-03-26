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
import { NaverProject } from '@modules/navers/infra/typeorm/entities/naver-project';

@Entity('projects')
export class Project {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => User, (user) => user.navers)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => NaverProject, (naverProject) => naverProject.project, {
    cascade: ['insert', 'update', 'remove'],
  })
  @JoinColumn({ name: 'project_id' })
  naversConnection: Promise<NaverProject[]>;

  @Column()
  name: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
