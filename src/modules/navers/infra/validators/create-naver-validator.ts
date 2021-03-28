import { celebrate, Segments, Joi } from 'celebrate';

export const createNaverValidator = celebrate({
  [Segments.BODY]: {
    name: Joi.string().required(),
    birthdate: Joi.date().required(),
    admission_date: Joi.date().required(),
    job_role: Joi.string().required(),
    projects: Joi.array().items(
      Joi.object({
        id: Joi.number().required(),
      })
    ),
  },
});
