import 'reflect-metadata';
import 'express-async-errors';

import express from 'express';
import { errors as validationErroHandler } from 'celebrate';

import { errorsHandler } from '@shared/handlers/errors-handler';
import createConnection from '@shared/infra/typeorm';
import '@shared/container';

import routes from './routes';

createConnection();

const app = express();

app.use(express.json());
app.use(routes);

app.use(validationErroHandler());
app.use(errorsHandler);

export default app;
