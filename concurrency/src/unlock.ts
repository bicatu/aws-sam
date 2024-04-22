import { Context } from 'aws-lambda';
import { Concurrency } from './concurrency';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';

export const handler = async (event: unknown, context: Context): Promise<unknown> => {
    try {
        console.log(event, context);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const id = event.concurrencyKey as string;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const concurrencyPrefix = event.concurrencyKey as string;
        const concurrency = new Concurrency(new DynamoDBClient({}), 'concurrency', concurrencyPrefix, 5);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const executionId = event.lockOwnerId as string;
        await concurrency.removeLock(id, executionId);
        return {
            statusCode: 200,
            body: JSON.stringify({
                message: 'hello world',
            }),
        };
    } catch (err) {
        console.log(err);
        throw err;
    }
};
