import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateNaverService } from '@modules/navers/services/create-naver';
import { FindNaverService } from '@modules/navers/services/find-naver';
import { ShowNaverService } from '@modules/navers/services/show-naver';
import { UpdateNaverService } from '@modules/navers/services/update-naver';
import { DeleteNaverService } from '@modules/navers/services/delete-naver';

import naverView from '@modules/navers/views/navers-view';

export class NaversController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { user } = request;
    const {
      name,
      birthdate,
      admission_date,
      job_role,
      projects,
    } = request.body;

    const createNaverService = container.resolve(CreateNaverService);

    const naver = await createNaverService.execute({
      user_id: user.id,
      name,
      birthdate,
      admission_date,
      job_role,
      projects,
    });

    return response.status(201).json(naverView.showNaver(naver));
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

    return response.status(200).json(naverView.listNavers(navers));
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showNaverService = container.resolve(ShowNaverService);

    const naver = await showNaverService.execute({ id });

    return response.status(200).json(naverView.showNaver(naver));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { user } = request;
    const { id: naver_id } = request.params;
    const {
      name,
      birthdate,
      admission_date,
      job_role,
      projects,
    } = request.body;

    const updateNaverService = container.resolve(UpdateNaverService);

    const naver = await updateNaverService.execute({
      user_id: user.id,
      naver_id,
      name,
      birthdate,
      admission_date,
      job_role,
      projects,
    });

    return response.status(200).json(naverView.showNaver(naver));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { user } = request;
    const { id } = request.params;

    const deleteNaverService = container.resolve(DeleteNaverService);

    await deleteNaverService.execute({ user_id: user.id, id });

    return response.status(200).json({
      message: 'Naver successfully deleted!',
    });
  }
}
