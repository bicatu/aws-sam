import { DynamoDBClient, ScanCommand } from '@aws-sdk/client-dynamodb';
import { OrderRepository } from '../../../domain/models/OrderRespository';

export class DynamoDbOrderRepository implements OrderRepository {
    constructor(private readonly dbClient: DynamoDBClient, private readonly tableName: string) {}

    async getAll(): Promise<unknown> {
        try {
            const command = new ScanCommand({
                TableName: this.tableName,
            });

            const result = await this.dbClient.send(command);
            if (result.Items) {
                return result.Items;
            }
        } catch (error) {
            console.log(error);
        }
    }
}