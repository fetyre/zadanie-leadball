import { IConfig } from './interface/config.interface';

export function config(): IConfig {
  return {
    authPassword: process.env.AUTH_USERNAME,
    authUsername: process.env.AUTH_PASSWORD,
  };
}
