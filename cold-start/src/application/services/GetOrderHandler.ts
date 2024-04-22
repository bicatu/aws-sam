import { OrderRepository } from '../../domain/models/OrderRespository';
import { GetOrder } from './GetOrder';
import { GetStockService } from './GetStockService';

export class GetOrderHandler {
    constructor(private readonly respository: OrderRepository, private readonly stockService: GetStockService) {}

    async handle(command: GetOrder): Promise<unknown> {
        console.log(command); // just for show
        const orders = await this.respository.getAll();
        const stock = await this.stockService.getStock('eur');
        return {
            orders,
            stock,
        };
    }
}
