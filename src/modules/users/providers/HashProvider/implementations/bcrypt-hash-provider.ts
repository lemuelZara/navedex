import { hash, compare } from 'bcryptjs';

import { IHashProvider } from '@modules/users/providers/HashProvider/models/hash-provider';

export class BCryptHashProvider implements IHashProvider {
  public async generateHash(data: string): Promise<string> {
    return hash(data, 12);
  }

  public async compareHash(data: string, hashed: string): Promise<boolean> {
    return compare(data, hashed);
  }
}
