import { Test, TestingModule } from '@nestjs/testing';

import { IOrder } from '../interface';
import { OrderService } from '../order.service';

describe('OrderService', () => {
	let service: OrderService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [OrderService]
		}).compile();

		service = module.get<OrderService>(OrderService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	describe('calculateAverage', () => {
		it('should throw error if orders array is empty', () => {
			expect(() => service.calculateAverage([])).toThrow('Not have orders');
		});

		it('should calculate the average correctly', () => {
			const orders: IOrder[] = [
				{
					'ID заказа': '7',
					'Номер заказа': 'ORD123459',
					Телефон: '+7-960-123-45-70',
					Цена: '157500',
					'Дата заказа': '2023-01-07',
					'Способ доставки': 'pickup',
					'Название товара': 'Эта-компонент'
				},
				{
					'ID заказа': '1',
					'Номер заказа': 'ORD123456',
					Телефон: '+7-950-123-45-67',
					Цена: '155000',
					'Дата заказа': '2023-01-01',
					'Способ доставки': 'pickup',
					'Название товара': 'Альфа-гаджет'
				}
			];
			expect(service.calculateAverage(orders)).toBe('1562.50');
		});
	});
});
