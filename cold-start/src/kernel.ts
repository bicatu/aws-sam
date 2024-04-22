import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { GetOrderHandler } from './application/services/GetOrderHandler';
import { MSStockService } from './infrastructure/application/services/MSStockService';
import { DynamoDbOrderRepository } from './infrastructure/domain/models/DynamoDbOrderRepository';

export const CreateGetOrderHandler = (table: string) => {
    return new GetOrderHandler(new DynamoDbOrderRepository(new DynamoDBClient({}), table), new MSStockService());
}
