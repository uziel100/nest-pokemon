import * as Joi from 'joi';

export const JoiValidationSchema = Joi.object({
  MONGODB: Joi.string().required(),
  PORT: Joi.number().default(3000),
  MONGO_DB_NAME: Joi.string().required(),
});
