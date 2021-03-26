import { injectable, inject } from 'tsyringe';

import { Naver } from '@modules/navers/infra/typeorm/entities/naver';
import { INaversRepository } from '@modules/navers/repositories/navers-repository';

import { removeArrayDuplicates } from '@modules/navers/utils/remove-array-duplicates';

interface IRequest {
  user_id: string;
  name: string;
  admission_date: Date;
  job_role: string;
}

@injectable()
export class FindNaverService {
  constructor(
    @inject('NaversRepository')
    private naversRepository: INaversRepository
  ) {}

  public async execute({
    user_id,
    name,
    admission_date,
    job_role,
  }: IRequest): Promise<Naver[] | undefined> {
    let findAllNaversByAdmissionDate: Naver[] = [];

    const admissionDateIsValid = !Number.isNaN(
      new Date(admission_date).getTime()
    );

    if (!name && !admissionDateIsValid && !job_role) {
      const findAllNavers = await this.naversRepository.findAllByUserId(
        user_id
      );

      return findAllNavers;
    }

    const findAllNaversByName = await this.naversRepository.findAllByName(
      name,
      user_id
    );

    findAllNaversByAdmissionDate = !admissionDateIsValid
      ? []
      : (findAllNaversByAdmissionDate = await this.naversRepository.findAllByAdmissionDate(
          admission_date,
          user_id
        ));

    const findAllNaversByJobRole = await this.naversRepository.findAllByJobRole(
      job_role,
      user_id
    );

    const naversArray = [
      ...findAllNaversByName,
      ...findAllNaversByAdmissionDate,
      ...findAllNaversByJobRole,
    ];

    const allNavers = removeArrayDuplicates(naversArray as []);

    return allNavers;
  }
}
