import { SQSClient, SendMessageCommand } from '@aws-sdk/client-sqs';

const sqsClient = new SQSClient({});
const queue = 'https://sqs.us-west-2.amazonaws.com/252011305655/CC-ConcurrencyControlledSource';

(async () => {
    for (let index = 0; index < 100; index++) {
        const response = await sqsClient.send(
            new SendMessageCommand({
                QueueUrl: queue,
                MessageBody: JSON.stringify({
                    concurrencyKey: 'CreateProductInspectionTool',
                    concurrencyPrefix: 'INBOUND',
                    maxConcurrencyLimit: 10,
                    waitTimeInSeconds: 10,
                }),
            }),
        );

        console.log(response.MessageId);
    }
})();
