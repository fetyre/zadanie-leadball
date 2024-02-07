import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

/**
 * @class ConfigLoaderService
 * @description Сервис для загрузки конфигурационных данных.
 * @see {@link getStringConfig} Получает строковое значение конфигурации.
 */
@Injectable()
export class ConfigLoaderService {
  private readonly logger: Logger = new Logger(ConfigLoaderService.name);

  readonly authUsername: string;
  readonly authPassword: string;

  constructor(private readonly configService: ConfigService) {
    this.authUsername = this.getStringConfig('authUsername');
    this.authPassword = this.getStringConfig('authPassword');
  }

  /**
   * @private
   * @method getStringConfig
   * @description Получает строковое значение конфигурации.
   * @param {string} key - Ключ конфигурации.
   * @returns {string} Строковое значение конфигурации.
   */
  private getStringConfig(key: string): string {
    this.logger.log(`getStringConfig: Starting process, key:${key}`);
    return this.configService.get<string>(key);
  }
}
