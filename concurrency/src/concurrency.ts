import { UpdateItemCommand, DynamoDBClient } from '@aws-sdk/client-dynamodb';

export class Concurrency {
    constructor(
        private readonly dynamodbClient: DynamoDBClient,
        private readonly tableName: string,
        private readonly keyPrefix: string,
        private readonly maxConcurrentExecutions: number,
    ) {}

    public async getLock(keyId: string, executionId: string): Promise<boolean> {
        const PK = `${this.keyPrefix}#${keyId}`;
        const CounterSK = PK;

        const command = new UpdateItemCommand({
            ExpressionAttributeNames: {
                '#count': 'count',
                '#owner': executionId,
            },
            ExpressionAttributeValues: {
                ':increase': {
                    N: '1',
                },
                ':limit': {
                    N: this.maxConcurrentExecutions.toString(),
                },
                ':init': {
                    N: '0',
                },
                ':now': {
                    S: new Date().toISOString(),
                },
            },
            UpdateExpression: 'SET #count = if_not_exists(#count, :init) + :increase, #owner = :now',
            ConditionExpression: '#count <> :limit and attribute_not_exists(#owner)',
            Key: {
                PK: { S: PK },
                SK: { S: CounterSK },
            },
            TableName: this.tableName,
        });

        console.log(command);

        try {
            await this.dynamodbClient.send(command);
        } catch (e) {
            throw e;
        }

        return true;
    }

    public async removeLock(keyId: string, executionId: string): Promise<boolean> {
        const PK = `${this.keyPrefix}#${keyId}`;
        const CounterSK = PK;

        const command = new UpdateItemCommand({
            ExpressionAttributeNames: {
                '#count': 'count',
                '#owner': executionId,
            },
            ExpressionAttributeValues: {
                ':decrease': {
                    N: '1',
                },
            },
            UpdateExpression: 'SET #count = #count - :decrease REMOVE #owner',
            ConditionExpression: 'attribute_exists(#owner)',
            Key: {
                PK: { S: PK },
                SK: { S: CounterSK },
            },
            TableName: this.tableName,
        });

        console.log(command);

        try {
            await this.dynamodbClient.send(command);
        } catch (e) {
            throw e;
        }

        return true;
    }
}
