import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateNaverService } from '@modules/navers/services/create-naver';
import { FindNaverService } from '@modules/navers/services/find-naver';

export class NaversController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { user } = request;
    const { name, birthdate, admission_date, job_role } = request.body;

    const createNaverService = container.resolve(CreateNaverService);

    const naver = await createNaverService.execute({
      name,
      birthdate,
      admission_date,
      job_role,
      user_id: user.id,
    });

    return response.status(201).json(naver);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const { user } = request;
    const filters = request.query;

    const name = filters.name as string;
    const admission_date = new Date(filters.admission_date as string);
    const job_role = filters.job_role as string;

    const findAllNavers = container.resolve(FindNaverService);

    const navers = await findAllNavers.execute({
      user_id: user.id,
      name,
      admission_date,
      job_role,
    });

    return response.status(200).json(navers);
  }
}
