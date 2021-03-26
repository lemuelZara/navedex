import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateNaverService } from '@modules/navers/services/create-naver';

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
}
