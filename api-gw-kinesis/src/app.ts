import { KinesisStreamEvent } from 'aws-lambda';

export const lambdaHandler = async (event: KinesisStreamEvent): Promise<any> => {
    event.Records.forEach((record) => {
        const payload = Buffer.from(record.kinesis.data, 'base64').toString('utf-8');
        console.log('Decoded payload:', payload);
    });  
};
