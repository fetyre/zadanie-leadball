/**
 * @description конфиг
 * @interface IConfig
 * @property {string} authUsername - имя для авторизации
 * @property {string} authPassword - пароль для авторизации
 */
export interface IConfig {
  authPassword: string;
  authUsername: string;
}
