import { Context } from 'aws-lambda';
import { StartExecutionCommand, SFNClient } from '@aws-sdk/client-sfn';

const sfClient = new SFNClient({});

export const handler = async (event: unknown, context: Context): Promise<unknown> => {
    try {
        console.log(event, context);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const concurrencyKey = JSON.parse(event.Records[0].body).concurrencyKey;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const maxConcurrencyLimit = JSON.parse(event.Records[0].body).maxConcurrencyLimit.toString();
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const waitTimeInSeconds = JSON.parse(event.Records[0].body).waitTimeInSeconds.toString();
        await sfClient.send(
            new StartExecutionCommand({
                stateMachineArn:
                    'arn:aws:states:us-west-2:252011305655:stateMachine:CC-ConcurrencyControlledStateMachine',
                input: JSON.stringify({
                    concurrencyKey,
                    maxConcurrencyLimit,
                    waitTimeInSeconds,
                }),
            }),
        );

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
