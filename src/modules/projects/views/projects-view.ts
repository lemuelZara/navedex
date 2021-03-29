import { Project } from '@modules/projects/infra/typeorm/entities/project';

export default {
  listProjects(projects: Project[]) {
    return projects.map((project) => ({
      id: project.id,
      name: project.name,
      created_at: project.created_at,
      updated_at: project.updated_at,
    }));
  },

  showProject(project: Project) {
    return {
      id: project.id,
      name: project.name,
      created_at: project.created_at,
      updated_at: project.updated_at,
      navers: project.navers.map((naver) => ({
        id: naver.id,
        name: naver.name,
        birthdate: naver.birthdate,
        admission_date: naver.admission_date,
        job_role: naver.job_role,
        created_at: naver.created_at,
        updated_at: naver.updated_at,
      })),
    };
  },
};
