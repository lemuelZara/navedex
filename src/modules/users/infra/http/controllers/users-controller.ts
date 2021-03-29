import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateUserService } from '@modules/users/services/create-user';

import userView from '@modules/users/views/users-view';

export class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const createUserService = container.resolve(CreateUserService);

    const user = await createUserService.execute({ email, password });

    return response.status(201).json(userView.showUser(user));
  }
}
