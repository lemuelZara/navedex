import * as dotenv from 'dotenv';

dotenv.config({
  path: `${__dirname}/../../../.env`,
});

export const { JWT_PRIVATE_KEY } = process.env;
export const { JWT_PUBLIC_KEY } = process.env;
export const { TOKEN_EXPIRATION_TIME } = process.env;
