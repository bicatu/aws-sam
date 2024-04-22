import axios from 'axios';
import { GetStockService } from '../../../application/services/GetStockService';

export class MSStockService implements GetStockService {
    async getStock(sku: string): Promise<unknown> {
        try {
            const result = await axios(
                `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${sku}.json`,
            );

            return result.data;
        } catch(error) {
            console.log(error);
            throw error;
        }
    }
}
