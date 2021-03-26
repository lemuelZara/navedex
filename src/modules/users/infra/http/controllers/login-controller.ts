import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { AuthUserService } from '@modules/users/services/auth-user';

export class LoginController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authUserService = container.resolve(AuthUserService);

    const { user, token } = await authUserService.execute({ email, password });

    return response.status(200).json({ user, token });
  }
}
