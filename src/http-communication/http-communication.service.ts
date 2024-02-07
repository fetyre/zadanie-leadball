import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { Observable, firstValueFrom } from 'rxjs';
import { IBody } from 'src/processing/interface';

/**
 * @class HttpCommunicationService
 * @description отправка get и post запросов.
 * @see {@link get} отправка get запроса для получения заказов в формате csv
 * @see {@link post} отправка post запроса для отправки средней суммы заказа
 */
@Injectable()
export class HttpCommunicationService {
  private readonly logger: Logger = new Logger(HttpCommunicationService.name);
  constructor(private http: HttpService) {}

  /**
   * @public
   * @description отправка get запроса для получения заказов в формате csv
   * @method get
   * @async
   * @param {string} url - адрес запроса
   * @param {AxiosRequestConfig} config - конфиг axios запроса
   * @returns {Promise<AxiosResponse<string>>} ответ запроса
   */
  public async get(
    url: string,
    config: AxiosRequestConfig,
  ): Promise<AxiosResponse<string>> {
    this.logger.log('get: Starting process.');
    const response: Observable<AxiosResponse<string>> = this.http.get<string>(
      url,
      config,
    );
    return await firstValueFrom(response);
  }

  /**
   * @public
   * @description отправка post запроса для отправки средней суммы заказа
   * @method post
   * @async
   * @param {string} url - адрес запроса
   * @param {AxiosRequestConfig} config - конфиг axios запроса
   * @param {IBody} body - тело запроса с средней суммой
   * @returns {Promise<void>} ничего
   */
  public async post(
    url: string,
    body: IBody,
    config: AxiosRequestConfig,
  ): Promise<void> {
    this.logger.log('post: Starting process.');
    const response: Observable<AxiosResponse<any>> = this.http.post<any>(
      url,
      body,
      config,
    );
    await firstValueFrom(response);
  }
}
