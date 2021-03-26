import { celebrate, Segments, Joi } from 'celebrate';

export const createUserValidator = celebrate({
  [Segments.BODY]: {
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  },
});
