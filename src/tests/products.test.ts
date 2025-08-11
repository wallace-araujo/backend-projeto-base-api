import { getProductById } from '../models/products.model';
import { getProductDetails } from '../services/products.service';
import { query } from '../config/database';

jest.mock('../config/database');

describe('Products', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('getProductById', () => {
        it('should return a product when it exists', async () => {
            const mockProduct = {
                id: 1,
                name: 'Test Product',
                description: 'Test Description',
                price: 10.99,
                quantity: 100
            };

            (query as jest.Mock).mockResolvedValue({ rows: [mockProduct] });

            const result = await getProductById(1);
            expect(result).toEqual(mockProduct);
            expect(query).toHaveBeenCalledWith('SELECT * FROM products WHERE id = $1', [1]);
        });

        it('should return null when product does not exist', async () => {
            (query as jest.Mock).mockResolvedValue({ rows: [] });

            const result = await getProductById(999);
            expect(result).toBeNull();
        });
    });

    describe('getProductDetails', () => {
        it('should return product details', async () => {
            const mockProduct = {
                id: 1,
                name: 'Test Product',
                description: 'Test Description',
                price: 10.99,
                quantity: 100
            };

            (query as jest.Mock).mockResolvedValue({ rows: [mockProduct] });

            const result = await getProductDetails(1);
            expect(result).toEqual(mockProduct);
        });

        it('should throw error when product not found', async () => {
            (query as jest.Mock).mockResolvedValue({ rows: [] });

            await expect(getProductDetails(999)).rejects.toThrow('Product not found');
        });
    });
});