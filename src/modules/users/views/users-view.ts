import { User } from '../infra/typeorm/entities/user';

export default {
  showUser(user: User) {
    return {
      id: user.id,
      email: user.email,
      created_at: user.created_at,
      updated_at: user.updated_at,
    };
  },
};
