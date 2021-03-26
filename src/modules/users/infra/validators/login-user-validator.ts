import { celebrate, Segments, Joi } from 'celebrate';

export const loginUserValidator = celebrate({
  [Segments.BODY]: {
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  },
});
