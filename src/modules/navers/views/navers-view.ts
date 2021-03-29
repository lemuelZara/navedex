import { Naver } from '@modules/navers/infra/typeorm/entities/naver';

export default {
  listNavers(navers: Naver[] | undefined) {
    return navers?.map((naver) => ({
      id: naver.id,
      name: naver.name,
      birthdate: naver.birthdate,
      admission_date: naver.admission_date,
      job_role: naver.job_role,
      created_at: naver.created_at,
      updated_at: naver.updated_at,
    }));
  },

  showNaver(naver: Naver) {
    return {
      id: naver.id,
      name: naver.name,
      birthdate: naver.birthdate,
      admission_date: naver.admission_date,
      job_role: naver.job_role,
      created_at: naver.created_at,
      updated_at: naver.updated_at,
      projects: naver.projects.map((project) => ({
        id: project.id,
        name: project.name,
        created_at: project.created_at,
        updated_at: project.updated_at,
      })),
    };
  },
};
