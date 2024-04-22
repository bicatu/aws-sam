import { waitRandomTime } from './utils';

export const handler = async (event: unknown): Promise<unknown> => {
    console.log(event);
    await waitRandomTime();
    try {
        return {
            statusCode: 200,
            body: JSON.stringify({
                message: 'hello world',
            }),
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
