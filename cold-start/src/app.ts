import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { GetOrder } from './application/services/GetOrder';
import { CreateGetOrderHandler } from './kernel';

const getOrderHandler = CreateGetOrderHandler('cold-start');

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        const result = await getOrderHandler.handle(new GetOrder('X'));

        return {
            statusCode: 200,
            body: JSON.stringify(result),
        };
    } catch (err) {
        console.log(err);
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: 'some error happened',
            }),
        };
    }
};
