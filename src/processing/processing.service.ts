import { Injectable, Logger } from '@nestjs/common';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { ConfigLoaderService } from 'src/config/config-loader.service';
import { CsvService } from 'src/csv/csv.service';
import { HttpCommunicationService } from 'src/http-communication/http-communication.service';
import { IOrder } from 'src/order/interface';
import { OrderService } from 'src/order/order.service';
import { IAuthHeader, IBody } from './interface';
import { AxiosResponseType } from './types/processing.types';

const TESTTASK_URL: string = 'https://leadball.ru/testtask/';
const TESTTASK_RESULT_URL: string = 'https://leadball.ru/testtask/result/';
const RESPONSE_TYPE: AxiosResponseType = 'stream';
const BASIC_AUTH_PREFIX: string = 'Basic ';
const AUTH_SEPARATOR: string = ':';
const BASE64_ENCODING: BufferEncoding = 'base64';
const DECIMAL_POINT: string = '.';
const DECIMAL_COMMA: string = ',';

/**
 * @class ProcessingService
 * @description сервис получение заказов, подсчета средней суммы и возврата ответа.
 * @see {@link getAverage} вычисление средней суммы закана, отправление овтета
 * @see {@link sendResult} отпарвление средней суммы на url адрес
 * @see {@link createConfig} создание конфигурации
 */
@Injectable()
export class ProcessingService {
  private readonly logger: Logger = new Logger(ProcessingService.name);

  constructor(
    private readonly httpCommunicationService: HttpCommunicationService,
    private readonly csvService: CsvService,
    private readonly ordersService: OrderService,
    private readonly configLoaderService: ConfigLoaderService,
  ) {}

  /**
   * @description Вычисление средней суммы закана, отправление овтета.
   * @method getAverage
   * @async
   * @public
   * @throws {Error} - возврат возникшей ошибки.
   * @see {@link createConfig} создание axios конфигурации
   * @see {@link HttpCommunicationService.get} get запрос для получения списка заказов
   * @see {@link CsvService.parse}
   * @see {@link OrderService.calculateAverage} вычисление средней суммы заказа.
   * @see {@link sendResult} отправелние средней суммы
   * @returns {Promise<void>} - ничего
   */
  public async getAverage(): Promise<void> {
    try {
      this.logger.log('getAverage: Starting process.');
      const config: AxiosRequestConfig = this.createConfig();
      const response: AxiosResponse<string> =
        await this.httpCommunicationService.get(TESTTASK_URL, config);
      this.logger.debug('getAverage: get req completed.');
      const orders: IOrder[] = await this.csvService.parse(response);
      this.logger.debug('getAverage: parse completed.');
      const average: string = this.ordersService.calculateAverage(orders);
      this.logger.debug(`getAverage: average amount=${average}.`);
      await this.sendResult(average, config);
      this.logger.debug('getAverage: post req completed.');
    } catch (err) {
      this.logger.error(`getAverage: Error in process, error:${err.message}.`);
      throw err;
    }
  }

  /**
   * @description отпарвление средней суммы на url адрес
   * @method sendResult
   * @async
   * @private
   * @param {string} average - средняя сумма
   * @param {AxiosRequestConfig} config - req конфиг
   * @see {@link HttpCommunicationService.post} post запрос для отпрвление средней суммы заказа
   * @returns {Promise<void>} ничего
   */
  private async sendResult(
    average: string,
    config: AxiosRequestConfig,
  ): Promise<void> {
    this.logger.log('sendResult: Starting process.');
    const body: IBody = {
      average: average.replace(DECIMAL_POINT, DECIMAL_COMMA),
    };
    await this.httpCommunicationService.post(TESTTASK_RESULT_URL, body, config);
  }

  /**
   * @description создание конфигурации.
   * @method createConfig
   * @private
   * @returns {AxiosRequestConfig} axios конфигурация
   */
  private createConfig(): AxiosRequestConfig {
    this.logger.log('createConfig: Starting process.');
    const AUTH_HEADER: IAuthHeader = {
      Authorization:
        BASIC_AUTH_PREFIX +
        Buffer.from(
          this.configLoaderService.authUsername +
            AUTH_SEPARATOR +
            this.configLoaderService.authPassword,
        ).toString(BASE64_ENCODING),
    };
    return {
      headers: AUTH_HEADER,
      responseType: RESPONSE_TYPE,
    };
  }
}
