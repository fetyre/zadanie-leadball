import { Injectable, Logger } from '@nestjs/common';
import { IOrder } from './interface';

const DELIVERY_METHOD_FIELD: string = 'Способ доставки';
const INITIAL_SUM: number = 0;
const INITIAL_COUNT: number = 0;
const RUSSIAN_PHONE_PREFIX: string = '+7';
const PICKUP_DELIVERY_METHOD: string = 'pickup';
const COPECKS_IN_RUBLE: number = 100;
const DECIMAL_PLACES: number = 2;
const INCREMENT: number = 1;
const EMPTY_ORDER: number = 0;

/**
 * @class OrderService
 * @description сервис для получения средней суммы заказов
 * @see {@link isRussianPickupOrder} Проверка подходит ли заказ под условиние с российским номером телефона и с опцией доставки — самовывоз
 * @see {@link calculateSumAndCount} Подсчет сумму и кол-во подходящих заказов
 * @see {@link calculateAverage} Подсчет средней суммы заказов
 * @see {@link checkEmptyOrders} проверка количества заказов
 */
@Injectable()
export class OrderService {
  private readonly logger: Logger = new Logger(OrderService.name);

  /**
   * @method isRussianPickupOrder
   * @private
   * @description Проверка подходит ли заказ под условиние с российским номером телефона и с опцией доставки — самовывоз
   * @param {IOrder} order - заказ для првоерки
   * @returns {boolean} подходящий ли заказ для подсчена средней суммы или нет
   */
  private isRussianPickupOrder(order: IOrder): boolean {
    this.logger.log('isRussianPickupOrder: Starting process.');
    return (
      order.Телефон.startsWith(RUSSIAN_PHONE_PREFIX) &&
      order[DELIVERY_METHOD_FIELD] === PICKUP_DELIVERY_METHOD
    );
  }

  /**
   * @method calculateSumAndCount
   * @private
   * @description Подсчет сумму и кол-во подходящих заказов
   * @param {IOrder[]} orders - заказы
   * @see {@link isRussianPickupOrder} проверка заказов на условие
   * @returns {Object} объет сумммы и кол-во заказов
   */
  private calculateSumAndCount(orders: IOrder[]): {
    sum: number;
    count: number;
  } {
    this.logger.log('calculateSumAndCount: Starting process.');
    return orders.reduce(
      (acc, order) => {
        if (this.isRussianPickupOrder(order)) {
          return {
            sum: acc.sum + Number(order.Цена) / COPECKS_IN_RUBLE,
            count: acc.count + INCREMENT,
          };
        }
        return acc;
      },
      { sum: INITIAL_SUM, count: INITIAL_COUNT },
    );
  }

  /**
   * @method calculateAverage
   * @public
   * @description Подсчет средней суммы заказов
   * @param {IOrder[]} orders - заказы для подсчета средней суммы
   * @see {@link checkEmptyOrders}  проверка кол-во заказов
   * @see {@link isRussianPickupOrder}  подсчет сумму и кол-во подходящих заказов
   * @returns {string} средняя сумма заказов
   */
  public calculateAverage(orders: IOrder[]): string {
    this.logger.log('calculateAverage: Starting process.');
    this.checkEmptyOrders(orders);
    const { sum, count } = this.calculateSumAndCount(orders);
    return (sum / count).toFixed(DECIMAL_PLACES);
  }

  /**
   * @method checkEmptyOrders
   * @private
   * @description проверка количества заказов
   * @param {IOrder[]} orders - заказы для првоерки
   * @returns {void} средняя сумма заказов
   * @throws {Error} - массив заказов пустой.
   */
  private checkEmptyOrders(orders: IOrder[]): void {
    if (orders.length === EMPTY_ORDER) {
      this.logger.error('calculateAverage: not have orders.');
      throw Error('Not have orders');
    }
  }
}
