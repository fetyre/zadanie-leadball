import * as Joi from 'joi';
import { IConfig } from './interface';

export const validationSchema: Joi.ObjectSchema<IConfig> = Joi.object({
  AUTH_USERNAME: Joi.string().required(),
  AUTH_PASSWORD: Joi.string().required(),
});
