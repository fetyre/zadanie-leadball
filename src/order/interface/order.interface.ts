/**
 * @description Заказ
 * @interface IOrder
 * @property {string} 'ID заказа' - индификатор заказа
 * @property {string} 'Номер заказа' - номер заказа
 * @property {string} Телефон - телефонный нмоер
 * @property {string} Цена - цена заказа
 * @property {string} 'Дата заказа' - дата заказа
 * @property {string} 'Способ доставки' - способ доставки
 * @property {string} 'Название товара' - Имя товара
 */
export interface IOrder {
  'ID заказа': string;
  'Номер заказа': string;
  Телефон: string;
  Цена: string;
  'Дата заказа': string;
  'Способ доставки': string;
  'Название товара': string;
}
