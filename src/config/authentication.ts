import {
  JWT_PRIVATE_KEY,
  JWT_PUBLIC_KEY,
  TOKEN_EXPIRATION_TIME,
} from '@shared/utils/env';

interface IAuthConfig {
  privateKey: string;
  publicKey: string;
  expiresIn: string;
}

export default {
  privateKey: JWT_PRIVATE_KEY,
  publicKey: JWT_PUBLIC_KEY,
  expiresIn: TOKEN_EXPIRATION_TIME,
} as IAuthConfig;
