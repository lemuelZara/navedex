import {
  CreateDateColumn,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Naver } from '@modules/navers/infra/typeorm/entities/naver';
import { Project } from '@modules/projects/infra/typeorm/entities/project';

export class NaverProject {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => Naver, (naver) => naver.projectsConnection)
  @JoinColumn({ name: 'naver_id' })
  naver: Promise<Naver>;

  @ManyToOne(() => Project, (project) => project.naversConnection)
  @JoinColumn({ name: 'project_id' })
  project: Promise<Project>;

  @CreateDateColumn()
  created_at: Date;
}
