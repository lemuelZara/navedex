import { celebrate, Segments, Joi } from 'celebrate';

export const createProjectValidator = celebrate({
  [Segments.BODY]: {
    name: Joi.string().required(),
  },
});
