import { Injectable, Logger } from '@nestjs/common';
import { IOrder } from 'src/order/interface';
import { AxiosResponse } from 'axios';
import { ParseResult, parse } from 'papaparse';

/**
 * @class CsvService
 * @description сервис для анализа csv данных.
 * @see {@link parse} анализ данных ответа и возврат заказов
 */
@Injectable()
export class CsvService {
  private readonly logger: Logger = new Logger(CsvService.name);

  /**
   * @description анализ данных ответа
   * @method parse
   * @async
   * @param {AxiosResponse<string>} response - даныне http ответа на get запрос для получения заказов
   * @returns {Promise<IOrder[]>} массив заказов
   */
  public async parse(response: AxiosResponse<string>): Promise<IOrder[]> {
    this.logger.log('parse: Starting process.');
    return new Promise((resolve, reject) => {
      this.logger.log('parse: Starting parsing.');
      parse<IOrder>(response.data, {
        header: true,
        skipEmptyLines: true,
        complete: (results: ParseResult<IOrder>) => {
          this.logger.debug(`parse: parsing completed.`);
          resolve(results.data);
        },
        error: (err) => {
          this.logger.error(`parse: Error parsing, error: ${err.message}.`);
          reject(err);
        },
      });
    });
  }
}
